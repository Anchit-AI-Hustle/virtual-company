#!/usr/bin/env bash
# The one safe way for any agent to publish its work to main, even with other agents pushing
# in parallel. Commit your own files first, then run: bash scripts/push.sh
#
# 1. Rebase on the latest main. Files are one per item, so conflicts should not happen. The
#    only expected overlap is an agent status file in company/activity/ (a shared reviewer
#    reporting for two pods): the newest status wins. Any other conflict stops the push.
# 2. Re-run every check on the merged result, so main never goes red.
# 3. Push. If someone pushed first, start again (up to 5 tries).
# Exit codes: 0 pushed, 2 real conflict (rebase aborted), 3 checks failed after merging, 4 gave up.
set -u
cd "$(dirname "$0")/.."
branch="HEAD:main"

for attempt in 1 2 3 4 5; do
  ok_pull=0
  for p in 1 2 3; do
    if git pull --rebase --autostash -q origin main 2>/tmp/push-pull.log; then ok_pull=1; break; fi
    # A conflict leaves a rebase in progress. Resolve status files, stop on anything else.
    while [ -d .git/rebase-merge ] || [ -d .git/rebase-apply ] || [ -d "$(git rev-parse --git-path rebase-merge)" ]; do
      conflicted=$(git diff --name-only --diff-filter=U)
      [ -z "$conflicted" ] && break
      if echo "$conflicted" | grep -qv '^company/activity/'; then
        echo "Conflict outside agent status files: $conflicted" >&2
        git rebase --abort
        exit 2
      fi
      # In a rebase, --theirs is the commit being replayed: this agent's newer status.
      echo "$conflicted" | xargs git checkout --theirs --
      echo "$conflicted" | xargs git add --
      GIT_EDITOR=true git rebase --continue >/dev/null 2>&1 || true
    done
    if ! [ -d "$(git rev-parse --git-path rebase-merge)" ] && ! [ -d "$(git rev-parse --git-path rebase-apply)" ]; then ok_pull=1; break; fi
    sleep $((p * 3))
  done
  [ "$ok_pull" = 1 ] || { cat /tmp/push-pull.log >&2; echo "Could not pull main" >&2; exit 4; }

  if ! ${PUSH_CHECK:-npm run -s check} >/tmp/push-check.log 2>&1; then
    echo "Checks fail after merging with main. Not pushing. Fix and run again:" >&2
    grep -E "FAIL|not ok" /tmp/push-check.log | head -20 >&2
    exit 3
  fi

  if git push -q origin "$branch" 2>/tmp/push-push.log; then
    echo "Pushed $(git rev-parse --short HEAD) to main."
    exit 0
  fi
  sleep $((attempt * 4))
done
cat /tmp/push-push.log >&2
echo "Gave up after 5 tries: main keeps moving." >&2
exit 4

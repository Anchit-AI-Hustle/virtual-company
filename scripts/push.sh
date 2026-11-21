#!/usr/bin/env bash
# The one safe way for any agent to publish its work to main, even with other agents pushing
# in parallel. Commit your own files first, then run: bash scripts/push.sh
#
# 1. Rebase on the latest main. Files are one per item, so conflicts should not happen. The
#    only expected overlap is an agent status file in company/activity/ (a shared reviewer
#    reporting for two pods): the newest status wins. Any other conflict stops the push.
# 2. Rebuild HQ's data from the merged books, then re-run every check on the result exactly as
#    CI does, so main never goes red.
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
      if echo "$conflicted" | grep -qvE '^(company/activity/|hq/public/(data|history)\.json$)'; then
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

  # HQ reads its live data from the committed hq/public/data.json, so rebuild it from the
  # merged books and fold it into this push. No Vercel deploy is needed for data changes.
  if node scripts/build-hq.js >/dev/null 2>&1; then
    git add hq/public/data.json hq/public/history.json
    git diff --cached --quiet || git -c user.name="$(git log -1 --format=%an)" -c user.email="$(git log -1 --format=%ae)" commit -q --amend --no-edit
  fi

  # Run the checks the way GitHub CI does: a clean copy of the commit outside any folder with
  # extra node modules, and no NODE_PATH, so nothing that only exists here can hide a failure.
  ci_mirror() {
    local d; d=$(mktemp -d /tmp/vc-ci-XXXXXX)
    git clone -q --no-hardlinks . "$d" && (cd "$d" && env -u NODE_PATH npm run -s check); local rc=$?
    rm -rf "$d"; return $rc
  }
  if ! ${PUSH_CHECK:-ci_mirror} >/tmp/push-check.log 2>&1; then
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

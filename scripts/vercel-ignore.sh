#!/usr/bin/env bash
# Vercel "Ignored Build Step" for every project in this repo. Exit 0 skips the build, exit 1
# builds. Vercel clones only recent history, so the previous deploy's commit may be missing:
# then fetch it, and if it still cannot be compared, build (never fail the deploy).
# Usage (from the project's root directory): bash <path>/vercel-ignore.sh <paths to watch...>
prev="${VERCEL_GIT_PREVIOUS_SHA:-}"
[ -z "$prev" ] && exit 1
git cat-file -e "$prev^{commit}" 2>/dev/null || git fetch -q --depth=500 origin "$prev" 2>/dev/null || git fetch -q --unshallow 2>/dev/null
git cat-file -e "$prev^{commit}" 2>/dev/null || exit 1
if git diff --quiet "$prev" HEAD -- "$@"; then
  echo "No changes in: $*. Skipping this build."
  exit 0
fi
exit 1

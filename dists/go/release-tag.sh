#!/usr/bin/env sh
#
# release-tag.sh
#
# Adds the Go module tag for a release: v6.12.0 -> dists/go/v6.12.0.
#
# Why: semantic-release tags releases as vX.Y.Z at the repository root. Go
# looks up a module that lives in a subdirectory by tags prefixed with that
# directory, so without dists/go/vX.Y.Z `go get` can't find the release.
#
# Started by .github/workflows/go-release-tag.yml on every published release,
# with the release commit checked out.
#
# Environment:
#   RELEASE_TAG        release tag, e.g. v6.12.0 or v7.0.0-next-major.3
#   GITHUB_REPOSITORY  owner/repo, set by GitHub Actions
#   GH_TOKEN           token with contents: write, used by `gh`
#   DRY_RUN=1          print what would be done, don't call GitHub
#
# Exit code: non-zero when the release major doesn't match the module path,
# so a forgotten /vN bump in go.mod is reported instead of silently producing
# a tag Go would reject.

set -eu

# Work relative to this script's own directory, whatever the caller's pwd is.
cd -- "$(dirname -- "$0")"

tag=${RELEASE_TAG:?RELEASE_TAG is required}
go_tag="dists/go/$tag"

case "$tag" in
  v[0-9]*.[0-9]*.[0-9]*) ;;
  *)
    echo "skip: '$tag' is not a vX.Y.Z release tag"
    exit 0
    ;;
esac

module=$(sed -n 's/^module[[:space:]][[:space:]]*//p' go.mod)
# Major version suffix of the module path, empty for v0 and v1 modules.
module_major=$(printf '%s\n' "$module" | sed -n 's|.*/v\([0-9][0-9]*\)$|\1|p')
tag_major=$(printf '%s\n' "$tag" | sed 's/^v\([0-9][0-9]*\).*/\1/')

if [ "$tag_major" -ge 2 ]; then
  expected_major=$tag_major
  expected_suffix="/v$tag_major"
else
  expected_major=
  expected_suffix='no /vN'
fi

if [ "$module_major" != "$expected_major" ]; then
  echo "error: release $tag needs module path suffix '$expected_suffix' in dists/go/go.mod, found module '$module'" >&2
  echo "error: bump the suffix in go.mod (see dists/go/README.md), then tag $go_tag manually" >&2
  exit 1
fi

sha=$(git rev-parse HEAD)

echo "> tag Go module $module"
echo "|---> $go_tag -> $sha"

if [ "${DRY_RUN:-}" = 1 ]; then
  echo '|---> dry run, nothing created'
  exit 0
fi

repo=${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required}

if gh api "repos/$repo/git/ref/tags/$go_tag" >/dev/null 2>&1; then
  echo "|---> $go_tag already exists, nothing to do"
  exit 0
fi

gh api --method POST "repos/$repo/git/refs" \
  -f ref="refs/tags/$go_tag" \
  -f sha="$sha" >/dev/null

echo "> tag Go module - done"

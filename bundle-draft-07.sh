#!/usr/bin/env sh
#
# bundle-draft-07.sh
#
# Bundles the draft-07 JSON Schemas for every AsyncAPI spec version.
#
# How it works:
#   1. Resolves the repository root from the location of THIS script, so it
#      can be launched from any working directory.
#   2. Discovers every draft-07/schemas/<version>/bundle.sh (new versions are
#      picked up automatically, no list to maintain).
#   3. Runs each bundle.sh in its own nested shell via `sh`. Each bundle.sh
#      changes into its own directory, so relative paths resolve correctly.
#
# Portability (Linux, macOS, Windows):
#   - POSIX sh only, no bashisms.
#   - Scripts are started with `sh <file>`, so no `chmod +x` is needed. This
#     matters on Windows, where the executable bit doesn't exist.
#   - On Windows run it from Git Bash or WSL.
#   - Keep LF line endings (see .gitattributes hint in the notes), otherwise
#     sh chokes on stray \r characters.
#
# Requirements: the `jsonschema` CLI must be available in PATH.
#
# Exit code: non-zero as soon as any version fails to bundle (CI friendly).

set -eu

# Absolute path of the directory containing this script.
# CDPATH is cleared so `cd` never prints or jumps somewhere unexpected.
ROOT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
SCHEMAS_DIR="$ROOT_DIR/draft-07/schemas"

# Fail early with a clear message instead of once per version.
if ! command -v jsonschema >/dev/null 2>&1; then
  echo "error: 'jsonschema' CLI was not found in PATH" >&2
  exit 1
fi

echo '> bundle draft-07 JSON Schemas'
echo '|---> bundling'

for script in "$SCHEMAS_DIR"/*/bundle.sh; do
  # Glob didn't match anything: the literal pattern is returned, skip it.
  [ -f "$script" ] || continue

  version=$(basename "$(dirname "$script")")
  echo "|------> $version"

  # Nested shell. Each bundle.sh cd's into its own directory.
  sh "$script"
done

echo '> bundle draft-07 JSON Schemas - done'
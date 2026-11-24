#!/usr/bin/env sh
#
# sync.sh
#
# Refreshes dists/go/schemas from dists/schemas.
#
# Why a copy: `//go:embed` can only embed files inside the module directory
# (no `..`, no symlinks), and Go modules are downloaded straight from git, so
# the embedded schemas must be committed here. Run this after any change in
# dists/schemas and commit the result. CI fails when the copy is out of sync.
#
# Portability: POSIX sh only. On Windows run it from Git Bash or WSL.

set -eu

# Work relative to this script's own directory, whatever the caller's pwd is.
cd -- "$(dirname -- "$0")"

SOURCE_DIR=../schemas
TARGET_DIR=schemas

echo '> sync Go package schemas'

# Fail before deleting anything if the source is missing or empty.
found=false
for file in "$SOURCE_DIR"/*.json; do
  [ -f "$file" ] && found=true && break
done
if [ "$found" != true ]; then
  echo "error: no JSON Schemas found in $SOURCE_DIR" >&2
  exit 1
fi

mkdir -p "$TARGET_DIR"

# Remove stale copies, so schemas deleted from the source disappear here too.
for file in "$TARGET_DIR"/*.json; do
  [ -f "$file" ] || continue
  rm -- "$file"
done

for file in "$SOURCE_DIR"/*.json; do
  echo "|---> $(basename -- "$file")"
  cp -- "$file" "$TARGET_DIR/"
done

echo '> sync Go package schemas - done'

#!/usr/bin/env sh
#
# bundle.sh
#
# Bundles asyncapi.json from THIS directory into two files:
#   - asyncapi-bundled.json              (keeps $id)
#   - asyncapi-bundled-without-$id.json  (--without-id)
#
# Normally started by bundle-draft-07.sh, but it also works when run
# directly from anywhere.
#
# Why the `cd`: the parent script's working directory is inherited by nested
# shells, so without it `asyncapi.json` would be looked up in the repo root
# instead of the version directory.
#
# Output files are overwritten (>) on each run. Appending (>>) would leave
# duplicated JSON in the files after the second run.
#
# $id patching: jsonschema copies the root $id of asyncapi.json into the
# bundle, so the bundle claims to BE asyncapi.json and collides with the
# source schema. After bundling, the root $id of asyncapi-bundled.json is
# rewritten so its last path segment is the name of the generated file:
#   .../v2.5.0/asyncapi.json  ->  .../v2.5.0/asyncapi-bundled.json
# Only the root $id is touched (2-space indent, first match). Nested $id
# values of embedded schemas are indented deeper and stay as they are.
# The --without-id bundle has no $id, so nothing collides and it isn't patched.
#
# Console output: the bundled JSON goes to a file, everything jsonschema
# prints (--verbose progress, errors) goes to stderr. That stream is indented
# one level deeper than the step header so the log stays a readable tree.
#
# Identical for every version, copy it as is into each draft-07/schemas/<version>/.

set -eu

# Work relative to this script's own directory, whatever the caller's pwd is.
cd -- "$(dirname -- "$0")"

# Indentation for lines printed by jsonschema itself (one level below the step).
LOG_PREFIX='|------------> '

# run <output-file> <command...>
#
# Runs <command>, writes its stdout to <output-file> and prefixes every line of
# its stderr with $LOG_PREFIX.
#
# Piping into sed would hide the command's exit code (POSIX sh has no
# `pipefail`), so the status is sent through file descriptor 3 and checked
# afterwards. A failing command therefore still aborts the script via `set -e`.
run() {
  out=$1
  shift
  status=$(
    {
      { "$@" 2>&1 >"$out"; echo $? >&3; } | sed "s/^/$LOG_PREFIX/" >&2
    } 3>&1
  )
  [ "$status" -eq 0 ]
}

# patch_id <file>
#
# Replaces the trailing "asyncapi.json" of the root $id with the file's own
# name. Uses a temp file + mv instead of `sed -i`, because the in-place flag
# differs between GNU sed (Linux, Git Bash) and BSD sed (macOS).
# Fails loudly if the root $id doesn't end with the file name afterwards, so a
# changed output format can't silently reintroduce the collision.
patch_id() {
  file=$1
  tmp="$file.tmp"

  echo "$LOG_PREFIX"'patching $id'

  sed 's|^\(  "\$id": ".*/\)asyncapi\.json"|\1'"$file"'"|' "$file" > "$tmp"
  mv -- "$tmp" "$file"

  if ! grep -F -m1 '"$id"' "$file" | grep -qF "/$file\""; then
    echo "error: root \$id of '$file' was not patched" >&2
    exit 1
  fi
}

echo '|---------> jsonschema - bundle with id'
run asyncapi-bundled.json \
  jsonschema bundle asyncapi.json --http --verbose
patch_id asyncapi-bundled.json

echo '|---------> jsonschema - bundle without id'
run 'asyncapi-bundled-without-$id.json' \
  jsonschema bundle asyncapi.json --http --without-id --verbose
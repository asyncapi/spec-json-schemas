# AsyncAPI JSON Schemas - Go module

Go module that embeds the bundled AsyncAPI JSON Schemas. It has no dependencies.

## Installation

```bash
go get github.com/asyncapi/spec-json-schemas/dists/go/v6
```

> [!NOTE]
> Until `v6.11.1` the module lived at the repository root as `github.com/asyncapi/spec-json-schemas/v6`.
> That import path still resolves, but it stays frozen at `v6.11.1`. Later releases are published only under `dists/go`, so switch the import path to get them.

## Usage

```go
import spec_json_schemas "github.com/asyncapi/spec-json-schemas/dists/go/v6"

func Do() {
    schema, err := spec_json_schemas.Get("3.0.0")
    if err != nil {
        panic(err)
    }
    if schema == nil {
        // version is unknown
    }

    // Do something with the schema
}
```

`Get` takes the file name of a schema without `.json`:

| Key                      | Schema                                     |
|--------------------------|--------------------------------------------|
| `3.0.0`                  | bundled schema with `$id`s                 |
| `3.0.0-without-$id`      | bundled schema without `$id`s              |
| `all.schema-store`       | schema used by [SchemaStore](https://www.schemastore.org/json/) |

Available versions: `1.0.0`, `1.1.0`, `1.2.0`, `2.0.0-rc1`, `2.0.0-rc2`, `2.0.0` through `2.6.0`, `3.0.0`, `3.1.0`.
An unknown key returns `nil, nil`.

## How the module is built

```
dists/schemas/*.json  --sync.sh-->  dists/go/schemas/*.json  --//go:embed-->  Get()
```

1. [`dists/schemas`](../schemas) holds the bundled schemas. The Go module and the npm package are both built from this folder.
2. [`sync.sh`](sync.sh) copies every `*.json` from `dists/schemas` into `dists/go/schemas`.
3. `//go:embed schemas/*.json` embeds that copy into the package.

Why the copy is committed:
- `//go:embed` can't reach files outside the module directory: it accepts no `..` and no symlinks.
- Go downloads modules straight from git at the release tag.

So after every change in `dists/schemas`, run:

```bash
sh dists/go/sync.sh
```

Then commit `dists/go/schemas`. CI ([go-test.yml](../../.github/workflows/go-test.yml)) runs `sync.sh` and fails when the committed copy differs. The `TestEmbeddedCopyInSync` test checks the same thing locally:

```bash
cd dists/go && go test -race ./...
```

## Releases and tags

The Go module shares its version with the npm package. One release produces both.

1. semantic-release (the centrally managed [if-nodejs-release.yml](../../.github/workflows/if-nodejs-release.yml)) creates the `vX.Y.Z` tag and its GitHub release.
2. When that release is published, [go-release-tag.yml](../../.github/workflows/go-release-tag.yml) runs [`release-tag.sh`](release-tag.sh). It adds `dists/go/vX.Y.Z` on the same commit.
3. Go resolves the module through that prefixed tag, because it lives in a subdirectory. Prereleases work the same way, e.g. `v6.12.0-next.1` gets `dists/go/v6.12.0-next.1`.

You can dry-run the script locally:

```bash
RELEASE_TAG=v6.12.0 DRY_RUN=1 sh dists/go/release-tag.sh
```

If the workflow failed or was skipped, add the tag by hand:

```bash
git tag dists/go/vX.Y.Z vX.Y.Z && git push origin dists/go/vX.Y.Z
```

### Major versions

Go requires the major version in the module path for `v2` and later. When a breaking release is coming (e.g. `v7.0.0`):

1. In [`go.mod`](go.mod), change the module path suffix to `/v7`.
2. Mention the new import path in the release notes.

`release-tag.sh` refuses to tag a release whose major doesn't match the `go.mod` suffix, so a forgotten bump shows up as a failed workflow instead of a broken Go release.

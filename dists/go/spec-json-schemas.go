// Package spec_json_schemas provides the bundled AsyncAPI JSON Schemas.
//
// Schemas are embedded into the binary at build time from the schemas
// directory, which is a copy of dists/schemas maintained by sync.sh.
package spec_json_schemas

import (
	"embed"
	"path"
	"strings"
	"sync"
)

//go:embed schemas/*.json
var fs embed.FS

var (
	loadOnce sync.Once
	loadErr  error
	specs    map[string][]byte
)

// Get retrieves the Schema for a given version, e.g. "3.0.0" or
// "3.0.0-without-$id". Nil if not found.
func Get(version string) ([]byte, error) {
	loadOnce.Do(load)
	if loadErr != nil {
		return nil, loadErr
	}

	return specs[version], nil
}

// load reads every embedded schema once. Keys are file names without ".json".
func load() {
	entries, err := fs.ReadDir("schemas")
	if err != nil {
		loadErr = err
		return
	}

	loaded := make(map[string][]byte, len(entries))
	for _, e := range entries {
		if e.IsDir() {
			continue
		}

		raw, err := fs.ReadFile(path.Join("schemas", e.Name()))
		if err != nil {
			loadErr = err
			return
		}

		loaded[strings.TrimSuffix(e.Name(), ".json")] = raw
	}

	specs = loaded
}

package spec_json_schemas

import (
	"embed"
	"fmt"
	"strings"
)

//go:embed schemas
var fs embed.FS
var specs = make(map[string][]byte)

// Get retrieves the Schema for a given version. Nil if not found.
func Get(version string) ([]byte, error) {
	if specs[version] == nil {
		schemas, err := fs.ReadDir("schemas")
		if err != nil {
			return nil, err
		}

		if len(schemas) == len(specs) {
			// No more files to load
			return nil, nil
		}

		for _, f := range schemas {
			if f.IsDir() {
				continue
			}

			raw, err := fs.ReadFile(fmt.Sprintf("schemas/%s", f.Name()))
			if err != nil {
				return nil, err
			}

			specs[strings.TrimSuffix(f.Name(), ".json")] = raw
		}
	}

	return specs[version], nil
}
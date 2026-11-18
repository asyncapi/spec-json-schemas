package spec_json_schemas

import (
	"bytes"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"testing"
)

// sourceDir is the shared schemas folder the embedded copy is synced from.
const sourceDir = "../schemas"

// sourceSchemas reads every JSON Schema from sourceDir, keyed like Get.
func sourceSchemas(t *testing.T) map[string][]byte {
	t.Helper()

	files, err := filepath.Glob(filepath.Join(sourceDir, "*.json"))
	if err != nil {
		t.Fatalf("listing %s: %v", sourceDir, err)
	}
	if len(files) == 0 {
		t.Fatalf("no JSON Schemas found in %s", sourceDir)
	}

	schemas := make(map[string][]byte, len(files))
	for _, f := range files {
		raw, err := os.ReadFile(f)
		if err != nil {
			t.Fatalf("reading %s: %v", f, err)
		}
		schemas[strings.TrimSuffix(filepath.Base(f), ".json")] = raw
	}

	return schemas
}

func TestGetKnownVersions(t *testing.T) {
	versions := []string{
		"1.0.0", "1.1.0", "1.2.0",
		"2.0.0-rc1", "2.0.0-rc2",
		"2.0.0", "2.1.0", "2.2.0", "2.3.0", "2.4.0", "2.5.0", "2.6.0",
		"3.0.0", "3.1.0",
	}

	for _, v := range versions {
		for _, key := range []string{v, v + "-without-$id"} {
			s, err := Get(key)
			if err != nil {
				t.Errorf("Get(%q): unexpected error: %v", key, err)
			}
			if s == nil {
				t.Errorf("Get(%q): schema not found", key)
			}
		}
	}
}

// TestEmbeddedCopyInSync fails when dists/go/schemas differs from
// dists/schemas. Fix it by running sync.sh.
func TestEmbeddedCopyInSync(t *testing.T) {
	expected := sourceSchemas(t)

	for key, want := range expected {
		got, err := Get(key)
		if err != nil {
			t.Fatalf("Get(%q): unexpected error: %v", key, err)
		}
		if !bytes.Equal(want, got) {
			t.Errorf("Get(%q): embedded schema differs from %s/%s.json, run sync.sh", key, sourceDir, key)
		}
	}

	if _, err := Get("1.0.0"); err != nil {
		t.Fatal(err)
	}
	for key := range specs {
		if _, ok := expected[key]; !ok {
			t.Errorf("embedded schema %q has no source in %s, run sync.sh", key, sourceDir)
		}
	}
}

func TestGetUnknownVersion(t *testing.T) {
	for _, key := range []string{"99.99.99-rc99-not-found", "", "../go.mod", "README.md"} {
		s, err := Get(key)
		if err != nil {
			t.Errorf("Get(%q): unexpected error: %v", key, err)
		}
		if s != nil {
			t.Errorf("Get(%q): expected nil, got %d bytes", key, len(s))
		}
	}
}

func TestGetConcurrent(t *testing.T) {
	var wg sync.WaitGroup
	for i := 0; i < 16; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			if s, err := Get("3.0.0"); err != nil || s == nil {
				t.Errorf("Get(\"3.0.0\"): got %d bytes, err %v", len(s), err)
			}
		}()
	}
	wg.Wait()
}

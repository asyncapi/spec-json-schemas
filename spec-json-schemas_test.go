package spec_json_schemas

import (
	"fmt"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"os"
	"testing"
)

func TestGet(t *testing.T) {
	tests := []struct {
		name string
		versions []string
		expectedErr error
		notFound bool
	}{
		{
			name: "All schemas should be available",
			versions: []string{"1.0.0", "1.1.0", "1.2.0", "2.0.0-rc1", "2.0.0-rc2", "2.1.0", "2.2.0"},
		},
		{
			name: "Missing schema should return nil",
			versions: []string{"99.99.99-rc99-not-found"},
			notFound: true,
		},
	}
		for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			for _, v := range test.versions {
				s, err := Get(v)
				if test.expectedErr == nil && !test.notFound {
					assert.NoError(t, err, "No error is expected")
					expectedContent, err := os.ReadFile(fmt.Sprintf("schemas/%s.json", v))
					require.NoError(t, err)
					require.NotNil(t, expectedContent)
					assert.Equal(t, expectedContent, s)
				} else if test.notFound {
					assert.NoError(t, err)
					assert.Nil(t, s)
				} else {
					assert.EqualError(t, err, test.expectedErr.Error())
				}
			}
		})
	}
}
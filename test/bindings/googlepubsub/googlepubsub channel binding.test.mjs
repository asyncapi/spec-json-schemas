import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const config = {
  "0.1.0": new JsonSchemaTestSuiteConfig(
    true,
    [
      'must have required property \'schemaSettings\'',
      'must have required property \'topic\''
    ],
    true,
    []
  ),
  "0.2.0": new JsonSchemaTestSuiteConfig(
    true,
    [
      'must have required property \'schemaSettings\'',
    ],
    true,
    []
  )
};

let data = {
  "0.1.0": new JsonSchemaTestSuiteData(
    require(`@bindings/googlepubsub/0.1.0/channel.json`),
    [
      {
        "topic": "projects/your-project/topics/topic-proto-schema",
        "messageRetentionDuration": "86400s",
        "messageStoragePolicy": {
          "allowedPersistenceRegions": [
            "us-central1",
            "us-central2",
            "us-east1",
            "us-east4",
            "us-east5",
            "us-east7",
            "us-south1",
            "us-west1",
            "us-west2",
            "us-west3",
            "us-west4"
          ]
        },
        "schemaSettings": {
          "encoding": "binary",
          "name": "projects/your-project/schemas/message-proto"
        },
        "bindingVersion": "0.1.0"
      }
    ],
    {
      "topic": "projects/your-project/topics/topic-proto-schema",
      "schemaSettings": {
        "encoding": "binary",
        "name": "projects/your-project/schemas/message-proto"
      },
      "bindingVersion": "0.1.0"
    },
    {
      "messageRetentionDuration": "86400s",
      "messageStoragePolicy": {
        "allowedPersistenceRegions": [
          "us-central1",
          "us-central2",
          "us-east1",
          "us-east4",
          "us-east5",
          "us-east7",
          "us-south1",
          "us-west1",
          "us-west2",
          "us-west3",
          "us-west4"
        ]
      },
      "bindingVersion": "0.1.0"
    },
    {
      "topic": "projects/your-project/topics/topic-proto-schema",
      "schemaSettings": {
        "encoding": "binary",
        "name": "projects/your-project/schemas/message-proto"
      },
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "topic": "projects/your-project/topics/topic-proto-schema",
      "schemaSettings": {
        "encoding": "binary",
        "name": "projects/your-project/schemas/message-proto"
      },
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      },
      "ext-number": 1
    }
  ),
  "0.2.0": new JsonSchemaTestSuiteData(
    require(`@bindings/googlepubsub/0.2.0/channel.json`),
    [
      {
        "messageRetentionDuration": "86400s",
        "messageStoragePolicy": {
          "allowedPersistenceRegions": [
            "us-central1",
            "us-central2",
            "us-east1",
            "us-east4",
            "us-east5",
            "us-east7",
            "us-south1",
            "us-west1",
            "us-west2",
            "us-west3",
            "us-west4"
          ]
        },
        "schemaSettings": {
          "encoding": "binary",
          "name": "projects/your-project/schemas/message-proto"
        }
      }
    ],
    {
      "schemaSettings": {
        "encoding": "binary",
        "name": "projects/your-project/schemas/message-proto"
      }
    },
    {
      "messageRetentionDuration": "86400s",
      "messageStoragePolicy": {
        "allowedPersistenceRegions": [
          "us-central1",
          "us-central2",
          "us-east1",
          "us-east4",
          "us-east5",
          "us-east7",
          "us-south1",
          "us-west1",
          "us-west2",
          "us-west3",
          "us-west4"
        ]
      }
    },
    {
      "schemaSettings": {
        "encoding": "binary",
        "name": "projects/your-project/schemas/message-proto"
      },
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "schemaSettings": {
        "encoding": "binary",
        "name": "projects/your-project/schemas/message-proto"
      },
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      },
      "ext-number": 1
    }
  ),
}

describe.each([
  '0.1.0',
  '0.2.0',
])('Google Pub/Sub channel binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config[bindingVersion]).testSuite()
})

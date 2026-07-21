import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import TestHelper from '@test/test-helper';
import {describe, it} from 'vitest';

const assert = require('assert');

const config = new JsonSchemaTestSuiteConfig(
  false,
  [],
  true,
  []
);

let data = {
  "0.1.0": new JsonSchemaTestSuiteData(
    require(`@bindings/kafka/0.1.0/operation.json`),
    [
      {
        "groupId": {
          "type": "string",
          "enum": [
            "myGroupId"
          ]
        },
        "clientId": {
          "type": "string",
          "enum": [
            "myClientId"
          ]
        }
      }
    ],
    {},
    {},
    {
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      },
      "ext-number": 1
    }
  ),
  "0.3.0": new JsonSchemaTestSuiteData(
    require(`@bindings/kafka/0.3.0/operation.json`),
    [
      {
        "groupId": {
          "type": "string",
          "enum": [
            "myGroupId"
          ]
        },
        "clientId": {
          "type": "string",
          "enum": [
            "myClientId"
          ]
        }
      }
    ],
    {},
    {},
    {
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      },
      "ext-number": 1
    }
  ),
  "0.4.0": new JsonSchemaTestSuiteData(
    require(`@bindings/kafka/0.4.0/operation.json`),
    [
      {
        "groupId": {
          "type": "string",
          "enum": [
            "myGroupId"
          ]
        },
        "clientId": {
          "type": "string",
          "enum": [
            "myClientId"
          ]
        }
      }
    ],
    {},
    {},
    {
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      },
      "ext-number": 1
    }
  ),
  "0.5.0": new JsonSchemaTestSuiteData(
    require(`@bindings/kafka/0.5.0/operation.json`),
    [
      {
        "groupId": {
          "type": "string",
          "enum": [
            "myGroupId"
          ]
        },
        "clientId": {
          "type": "string",
          "enum": [
            "myClientId"
          ]
        }
      }
    ],
    {},
    {},
    {
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      },
      "ext-number": 1
    }
  ),
  "0.6.0": new JsonSchemaTestSuiteData(
    require(`@bindings/kafka/0.6.0/operation.json`),
    [
      {
        "groupId": {
          "const": "myGroupId"
        },
        "clientId": {
          "const": "myClientId"
        },
        "bindingVersion": "0.6.0"
      },
      {
        "transactionalIdPrefix": "payments-service-",
        "principal": "User:payment-producer",
        "bindingVersion": "0.6.0"
      },
      {
        "groupId": {
          "type": "string",
          "enum": [
            "myGroupId"
          ]
        },
        "isolationLevel": "read_committed",
        "errorTopics": {
          "addressTemplate": "${groupId}.__.${channel.address}.${suffix}",
          "retryTopics": 3,
          "extraHeaders": {
            "$ref": "#/components/schemas/SpringKafkaErrorHeaders"
          },
          "retry": {
            "partitions": 1,
            "replicas": 2,
            "topicConfiguration": { "retention.ms": 259200000 }
          },
          "dlq": {
            "partitions": 1,
            "replicas": 2,
            "topicConfiguration": {
              "retention.ms": 2592000000,
              "cleanup.policy": ["delete"]
            }
          }
        },
        "principal": "User:payment-consumer",
        "bindingVersion": "0.6.0"
      }
    ],
    {},
    {},
    {
      "x-number": 0,
      "x-string": "",
      "x-object": {
        "property": {}
      }
    },
    {
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
  '0.3.0',
  '0.4.0',
  '0.5.0',
  '0.6.0',
])('Kafka operation binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})

describe('Kafka operation binding v0.6.0 errorTopics', () => {
  const schema = require(`@bindings/kafka/0.6.0/operation.json`);

  it('allows root-level extraHeaders schema objects', () => TestHelper.objectIsValid(
    schema,
    {
      "errorTopics": {
        "addressTemplate": "${groupId}.__.${channel.address}.${suffix}",
        "extraHeaders": {
          "type": "object",
          "properties": {
            "kafka_originalTopic": {
              "type": "string"
            }
          }
        }
      },
      "bindingVersion": "0.6.0"
    },
  ));

  it('allows root-level extraHeaders references', () => TestHelper.objectIsValid(
    schema,
    {
      "errorTopics": {
        "addressTemplate": "${groupId}.__.${channel.address}.${suffix}",
        "extraHeaders": {
          "$ref": "#/components/schemas/SpringKafkaErrorHeaders"
        }
      },
      "bindingVersion": "0.6.0"
    },
  ));

  it('allows retry and dlq references', () => TestHelper.objectIsValid(
    schema,
    {
      "errorTopics": {
        "addressTemplate": "${groupId}.__.${channel.address}.${suffix}",
        "retryTopics": 3,
        "retry": {
          "$ref": "#/components/error-topics/retry/silver"
        },
        "dlq": {
          "$ref": "#/components/error-topics/dlq/compliance"
        }
      },
      "bindingVersion": "0.6.0"
    },
  ));

  it('requires retryTopics when retry is present', () => {
    const validator = TestHelper.validator(schema);
    const validationResult = validator({
      "errorTopics": {
        "addressTemplate": "${groupId}.__.${channel.address}.${suffix}",
        "retry": {
          "partitions": 1
        }
      },
      "bindingVersion": "0.6.0"
    });

    assert(validationResult === false, 'Object MUST NOT be valid');
    assert(validator.errors.some(error => error.message === "must have required property 'retryTopics'"));
  });
})

describe('Kafka operation binding v0.6.0 groupId and clientId', () => {
  const schema = require(`@bindings/kafka/0.6.0/operation.json`);

  it('allows schema objects', () => TestHelper.objectIsValid(
    schema,
    {
      "groupId": {
        "type": "string",
        "enum": [
          "payments-consumer-group"
        ]
      },
      "clientId": {
        "type": "string",
        "enum": [
          "payments-client"
        ]
      },
      "bindingVersion": "0.6.0"
    },
  ));

  it('allows references', () => TestHelper.objectIsValid(
    schema,
    {
      "groupId": {
        "$ref": "#/components/schemas/kafkaGroupId"
      },
      "clientId": {
        "$ref": "#/components/schemas/kafkaClientId"
      },
      "bindingVersion": "0.6.0"
    },
  ));

  it('rejects string values', () => {
    const validator = TestHelper.validator(schema);
    const validationResult = validator({
      "groupId": "payments-consumer-group",
      "clientId": "payments-client",
      "bindingVersion": "0.6.0"
    });

    assert(validationResult === false, 'Object MUST NOT be valid');
  });

  it('rejects arrays', () => {
    const validator = TestHelper.validator(schema);
    const validationResult = validator({
      "groupId": [
        "payments-consumer-group",
        "payments-consumer-group-replay"
      ],
      "clientId": [
        "payments-client",
        "payments-client-replay"
      ],
      "bindingVersion": "0.6.0"
    });

    assert(validationResult === false, 'Object MUST NOT be valid');
  });
})

describe('Kafka operation binding v0.6.0 transactions', () => {
  const schema = require(`@bindings/kafka/0.6.0/operation.json`);

  it('allows transactionalIdPrefix', () => TestHelper.objectIsValid(
    schema,
    {
      "transactionalIdPrefix": "payments-service-",
      "bindingVersion": "0.6.0"
    },
  ));

  it('rejects transactional boolean', () => TestHelper.objectIsNotValid(
    schema,
    {
      "transactional": true,
      "bindingVersion": "0.6.0"
    },
    [
      "must NOT have additional properties"
    ]
  ));
})

describe('Kafka operation binding v0.6.0 bindingVersion', () => {
  const schema = require(`@bindings/kafka/0.6.0/operation.json`);

  it('rejects previous bindingVersion values', () => TestHelper.objectIsNotValid(
    schema,
    {
      "transactionalIdPrefix": "payments-service-",
      "bindingVersion": "0.5.0"
    },
    [
      "must be equal to one of the allowed values"
    ]
  ));
})

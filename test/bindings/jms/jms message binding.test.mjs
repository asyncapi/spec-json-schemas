import {
  JsonSchemaTestSuite,
  JsonSchemaTestSuiteConfig,
  JsonSchemaTestSuiteData
} from '@test/definitions/base-schema-test.mjs';
import {describe} from 'vitest';

const config = new JsonSchemaTestSuiteConfig(
  false,
  [],
  true,
  []
);

let data = {
  "0.0.1": new JsonSchemaTestSuiteData(
    require(`@bindings/jms/0.0.1/message.json`),
    [
      {
        "headers": {
          "type": "object",
          "required": ["JMSMessageID"],
          "properties": {
            "JMSMessageID": {
              "type": ["string", "null"],
              "description": "A unique message identifier. This may be set by your JMS Provider on your behalf."
            },
            "JMSTimestamp": {
              "type": "integer",
              "description": "The time the message was sent. This may be set by your JMS Provider on your behalf. The time the message was sent. The value of the timestamp is the amount of time, measured in milliseconds, that has elapsed since midnight, January 1, 1970, UTC."
            },
            "JMSDeliveryMode": {
              "type": "string",
              "enum": ["PERSISTENT", "NON_PERSISTENT"],
              "default": "PERSISTENT",
              "description": "Denotes the delivery mode for the message. This may be set by your JMS Provider on your behalf."
            },
            "JMSPriority": {
              "type": "integer",
              "default": 4,
              "description": "The priority of the message. This may be set by your JMS Provider on your behalf."
            },
            "JMSExpires": {
              "type": "integer",
              "description": "The time at which the message expires. This may be set by your JMS Provider on your behalf. A value of zero means that the message does not expire. Any non-zero value is the amount of time, measured in milliseconds, that has elapsed since midnight, January 1, 1970, UTC, at which the message will expire."
            },
            "JMSType": {
              "type": ["string", "null"],
              "description": "The type of message. Some JMS providers use a message repository that contains the definitions of messages sent by applications. The 'JMSType' header field may reference a message's definition in the provider's repository. The JMS API does not define a standard message definition repository, nor does it define a naming policy for the definitions it contains. Some messaging systems require that a message type definition for each application message be created and that each message specify its type. In order to work with such JMS providers, JMS clients should assign a value to 'JMSType', whether the application makes use of it or not. This ensures that the field is properly set for those providers that require it."
            },
            "JMSCorrelationID": {
              "type": ["string", "null"],
              "description": "The correlation identifier of the message. A client can use the 'JMSCorrelationID' header field to link one message with another. A typical use is to link a response message with its request message. Since each message sent by a JMS provider is assigned a message ID value, it is convenient to link messages via message ID, such message ID values must start with the 'ID:' prefix. Conversely, application-specified values must not start with the 'ID:' prefix; this is reserved for provider-generated message ID values."
            },
            "JMSReplyTo": {
              "type": "string",
              "description": "The queue or topic that the message sender expects replies to."
            }
          }
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
}

describe.each([
  '0.0.1',
])('JMS message binding v%s', (bindingVersion) => {
  new JsonSchemaTestSuite(data[bindingVersion], config).testSuite()
})

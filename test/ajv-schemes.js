module.exports = schemesV3_0_0;

function bindingSchemes(ajv) {
  // ajv.addSchema(require('@bindings/amqp/0.2.0/channel.json'));
  ajv.addSchema(require('@bindings/amqp/0.2.0/message.json'));
  ajv.addSchema(require('@bindings/amqp/0.2.0/operation.json'));
  // ajv.addSchema(require('@bindings/amqp/0.3.0/channel.json'));
  ajv.addSchema(require('@bindings/amqp/0.3.0/message.json'));
  ajv.addSchema(require('@bindings/amqp/0.3.0/operation.json'));

  ajv.addSchema(require('@bindings/anypointmq/0.0.1/channel.json'));
  ajv.addSchema(require('@bindings/anypointmq/0.0.1/message.json'));

  ajv.addSchema(require('@bindings/googlepubsub/0.1.0/channel.json'));
  ajv.addSchema(require('@bindings/googlepubsub/0.1.0/message.json'));
  ajv.addSchema(require('@bindings/googlepubsub/0.2.0/channel.json'));
  ajv.addSchema(require('@bindings/googlepubsub/0.2.0/message.json'));

  ajv.addSchema(require('@bindings/http/0.1.0/message.json'));
  ajv.addSchema(require('@bindings/http/0.1.0/operation.json'));
  ajv.addSchema(require('@bindings/http/0.2.0/message.json'));
  ajv.addSchema(require('@bindings/http/0.2.0/operation.json'));
  ajv.addSchema(require('@bindings/http/0.3.0/message.json'));
  ajv.addSchema(require('@bindings/http/0.3.0/operation.json'));

  ajv.addSchema(require('@bindings/ibmmq/0.1.0/channel.json'));
  ajv.addSchema(require('@bindings/ibmmq/0.1.0/message.json'));
  ajv.addSchema(require('@bindings/ibmmq/0.1.0/server.json'));

  ajv.addSchema(require('@bindings/jms/0.0.1/channel.json'));
  ajv.addSchema(require('@bindings/jms/0.0.1/message.json'));
  ajv.addSchema(require('@bindings/jms/0.0.1/server.json'));

  ajv.addSchema(require('@bindings/kafka/0.1.0/message.json'));
  ajv.addSchema(require('@bindings/kafka/0.1.0/operation.json'));
  ajv.addSchema(require('@bindings/kafka/0.3.0/channel.json'));
  ajv.addSchema(require('@bindings/kafka/0.3.0/message.json'));
  ajv.addSchema(require('@bindings/kafka/0.3.0/operation.json'));
  ajv.addSchema(require('@bindings/kafka/0.3.0/server.json'));
  ajv.addSchema(require('@bindings/kafka/0.4.0/channel.json'));
  ajv.addSchema(require('@bindings/kafka/0.4.0/message.json'));
  ajv.addSchema(require('@bindings/kafka/0.4.0/operation.json'));
  ajv.addSchema(require('@bindings/kafka/0.4.0/server.json'));
  ajv.addSchema(require('@bindings/kafka/0.5.0/channel.json'));
  ajv.addSchema(require('@bindings/kafka/0.5.0/message.json'));
  ajv.addSchema(require('@bindings/kafka/0.5.0/operation.json'));
  ajv.addSchema(require('@bindings/kafka/0.5.0/server.json'));

  ajv.addSchema(require('@bindings/mqtt/0.1.0/message.json'));
  ajv.addSchema(require('@bindings/mqtt/0.1.0/operation.json'));
  ajv.addSchema(require('@bindings/mqtt/0.1.0/server.json'));
  ajv.addSchema(require('@bindings/mqtt/0.2.0/message.json'));
  ajv.addSchema(require('@bindings/mqtt/0.2.0/operation.json'));
  ajv.addSchema(require('@bindings/mqtt/0.2.0/server.json'));

  ajv.addSchema(require('@bindings/nats/0.1.0/operation.json'));

  ajv.addSchema(require('@bindings/pulsar/0.1.0/channel.json'));
  ajv.addSchema(require('@bindings/pulsar/0.1.0/server.json'));

  ajv.addSchema(require('@bindings/sns/0.1.0/channel.json'));
  ajv.addSchema(require('@bindings/sns/0.1.0/operation.json'));

  ajv.addSchema(require('@bindings/solace/0.2.0/operation.json'));
  ajv.addSchema(require('@bindings/solace/0.2.0/server.json'));
  ajv.addSchema(require('@bindings/solace/0.3.0/operation.json'));
  ajv.addSchema(require('@bindings/solace/0.3.0/server.json'));
  ajv.addSchema(require('@bindings/solace/0.4.0/operation.json'));
  ajv.addSchema(require('@bindings/solace/0.4.0/server.json'));

  ajv.addSchema(require('@bindings/sqs/0.2.0/channel.json'));
  ajv.addSchema(require('@bindings/sqs/0.2.0/operation.json'));

  ajv.addSchema(require('@bindings/websockets/0.1.0/channel.json'));

  return ajv;
}

function schemesV3_0_0(ajv) {
  ajv.addSchema(require('@definitions/3.0.0/anySchema.json'));
  ajv.addSchema(require('@definitions/3.0.0/apiKey.json'));
  ajv.addSchema(require('@definitions/3.0.0/APIKeyHTTPSecurityScheme.json'));
  ajv.addSchema(require('@definitions/3.0.0/asymmetricEncryption.json'));
  ajv.addSchema(require('@definitions/3.0.0/asyncapi.json'));
  ajv.addSchema(require('@definitions/3.0.0/BearerHTTPSecurityScheme.json'));
  ajv.addSchema(require('@definitions/3.0.0/channel.json'));
  ajv.addSchema(require('@definitions/3.0.0/channelBindingsObject.json'));
  ajv.addSchema(require('@definitions/3.0.0/channelMessages.json'));
  ajv.addSchema(require('@definitions/3.0.0/channels.json'));
  ajv.addSchema(require('@definitions/3.0.0/components.json'));
  ajv.addSchema(require('@definitions/3.0.0/contact.json'));
  ajv.addSchema(require('@definitions/3.0.0/correlationId.json'));
  ajv.addSchema(require('@definitions/3.0.0/externalDocs.json'));
  ajv.addSchema(require('@definitions/3.0.0/HTTPSecurityScheme.json'));
  ajv.addSchema(require('@definitions/3.0.0/info.json'));
  ajv.addSchema(require('@definitions/3.0.0/infoExtensions.json'));
  ajv.addSchema(require('@definitions/3.0.0/license.json'));
  ajv.addSchema(require('@definitions/3.0.0/messageBindingsObject.json'));
  ajv.addSchema(require('@definitions/3.0.0/messageExampleObject.json'));
  ajv.addSchema(require('@definitions/3.0.0/messageObject.json'));
  ajv.addSchema(require('@definitions/3.0.0/messages.json'));
  ajv.addSchema(require('@definitions/3.0.0/messageTrait.json'));
  ajv.addSchema(require('@definitions/3.0.0/multiFormatSchema.json'));
  ajv.addSchema(require('@definitions/3.0.0/NonBearerHTTPSecurityScheme.json'));
  ajv.addSchema(require('@definitions/3.0.0/oauth2Flow.json'));
  ajv.addSchema(require('@definitions/3.0.0/oauth2Flows.json'));
  ajv.addSchema(require('@definitions/3.0.0/oauth2Scopes.json'));
  ajv.addSchema(require('@definitions/3.0.0/openIdConnect.json'));
  ajv.addSchema(require('@definitions/3.0.0/operationBindingsObject.json'));
  ajv.addSchema(require('@definitions/3.0.0/operationReply.json'));
  ajv.addSchema(require('@definitions/3.0.0/operationReplyAddress.json'));
  ajv.addSchema(require('@definitions/3.0.0/operation.json'));
  ajv.addSchema(require('@definitions/3.0.0/operations.json'));
  ajv.addSchema(require('@definitions/3.0.0/operationTrait.json'));
  ajv.addSchema(require('@definitions/3.0.0/parameter.json'));
  ajv.addSchema(require('@definitions/3.0.0/parameters.json'));
  ajv.addSchema(require('@definitions/3.0.0/Reference.json'));
  ajv.addSchema(require('@definitions/3.0.0/ReferenceObject.json'));
  ajv.addSchema(require('@definitions/3.0.0/SaslGssapiSecurityScheme.json'));
  ajv.addSchema(require('@definitions/3.0.0/SaslPlainSecurityScheme.json'));
  ajv.addSchema(require('@definitions/3.0.0/SaslSecurityScheme.json'));
  ajv.addSchema(require('@definitions/3.0.0/SaslScramSecurityScheme.json'));
  ajv.addSchema(require('@definitions/3.0.0/schema.json'));
  ajv.addSchema(require('@definitions/3.0.0/securityRequirements.json'));
  ajv.addSchema(require('@definitions/3.0.0/SecurityScheme.json'));
  ajv.addSchema(require('@definitions/3.0.0/server.json'));
  ajv.addSchema(require('@definitions/3.0.0/serverBindingsObject.json'));
  ajv.addSchema(require('@definitions/3.0.0/servers.json'));
  ajv.addSchema(require('@definitions/3.0.0/serverVariable.json'));
  ajv.addSchema(require('@definitions/3.0.0/serverVariables.json'));
  ajv.addSchema(require('@definitions/3.0.0/specificationExtension.json'));
  ajv.addSchema(require('@definitions/3.0.0/symmetricEncryption.json'));
  ajv.addSchema(require('@definitions/3.0.0/tag.json'));
  ajv.addSchema(require('@definitions/3.0.0/userPassword.json'));
  ajv.addSchema(require('@definitions/3.0.0/X509.json'));

  ajv.addSchema(require('@common/avroSchema_v1.json'));
  ajv.addSchema(require('@common/openapiSchema_3_0.json'));

  ajv.addSchema(require('@extensions/x/0.1.0/schema.json'));
  ajv.addSchema(require('@extensions/linkedin/0.1.0/schema.json'));

  return bindingSchemes(ajv);
}

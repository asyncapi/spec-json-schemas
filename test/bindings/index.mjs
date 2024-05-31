import {describe, suite} from 'vitest';

suite('Bindings', () => {
  test('AMQP', () => require('./amqp'))
  test('Anypoint MQ', () => require('./anypointmq'))
  test('Google Pub/Sub', () => require('./googlepubsub'))
  test('HTTP', () => require('./http'))
  test('IBM MQ', () => require('./ibmmq'))
  test('JMS', () => require('./jms'))
  test('Kafka', () => require('./kafka'))
  test('MQTT', () => require('./mqtt'))
  test('NATS', () => require('./nats'))
  test('Pulsar', () => require('./pulsar'))
  test('SNS', () => require('./sns'))
  test('Solace', () => require('./solace'))
  test('SQS', () => require('./sqs'))
  test('WebSockets', () => require('./websockets'))
})
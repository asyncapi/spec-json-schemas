import {describe, expect, it} from 'vitest';
import TestHelper from '@test/test-helper';

const operationSchema = require('@definitions/3.0.0/operation.json');

const retryRoute = {
  "channel": {"$ref": "#/channels/retries"},
  "messages": [{"$ref": "#/channels/retries/messages/retry"}],
  "maxAttempts": 3,
  "strategy": {
    "type": "linear",
    "initialDelay": "PT5S",
    "delayIncrement": "PT10S",
    "maxDelay": "PT1M"
  }
};

const deadLetterRoute = {
  "channel": {"$ref": "#/channels/deadLetters"},
  "messages": [{"$ref": "#/channels/deadLetters/messages/deadLetter"}],
  "maxWaitTime": "PT15M"
};

const operationWith = (overrides) => ({
  "action": "receive",
  "channel": {"$ref": "#/channels/orders"},
  ...overrides
});

describe('Operation retry and dead-letter paths', () => {
  it('accepts fixed, linear, and exponential retry strategies', () => {
    const strategies = [
      {"type": "fixed", "delay": "PT30S"},
      retryRoute.strategy,
      {"type": "exponential", "initialDelay": "PT1S", "multiplier": 2, "maxDelay": "PT1H"}
    ];

    for (const strategy of strategies) {
      const validate = TestHelper.validator(operationSchema);
      expect(validate(operationWith({"retry": {...retryRoute, strategy}}))).toBe(true);
    }
  });

  it('accepts a dead-letter path with an ISO 8601 wait time', () => {
    const validate = TestHelper.validator(operationSchema);
    expect(validate(operationWith({"deadLetter": deadLetterRoute}))).toBe(true);
  });

  it('rejects non-duration retry and dead-letter wait values', () => {
    const invalidDurationValues = ["15", "P1D", "PT"];

    for (const duration of invalidDurationValues) {
      const retryValidation = TestHelper.validator(operationSchema);
      expect(retryValidation(operationWith({
        "retry": {...retryRoute, "strategy": {"type": "fixed", "delay": duration}}
      }))).toBe(false);

      const deadLetterValidation = TestHelper.validator(operationSchema);
      expect(deadLetterValidation(operationWith({
        "deadLetter": {...deadLetterRoute, "maxWaitTime": duration}
      }))).toBe(false);
    }
  });

  it('rejects retry and dead-letter paths on send operations', () => {
    const validate = TestHelper.validator(operationSchema);
    expect(validate({
      ...operationWith({"retry": retryRoute, "deadLetter": deadLetterRoute}),
      "action": "send"
    })).toBe(false);
  });
});

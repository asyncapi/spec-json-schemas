import {describe} from 'vitest';

describe('Operation test suite', () => {
  test('Operation', require('./operation'));
  test('Operation Reply', require('./operationReply'));
  test('Operation Reply Address', require('./operationReplyAddress'));
  test('Operation Operation Trait', require('./operationTrait'));
});

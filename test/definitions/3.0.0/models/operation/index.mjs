import {describe} from 'vitest';

describe('Operation Test Suite', async () => {
  await import('./operation');
  await import('./operationReply');
  await import('./operationReplyAddress');
  await import('./operationTrait');
});

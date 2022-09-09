import type { JSONSchema7 } from 'json-schema';

declare module '@asyncapi/specs/supported' {
  declare const schemas: {
    '2.0.0': JSONSchema7,
    '2.1.0': JSONSchema7,
    '2.2.0': JSONSchema7,
    '2.3.0': JSONSchema7,
    '2.4.0': JSONSchema7,
  }

  export default schemas;
}

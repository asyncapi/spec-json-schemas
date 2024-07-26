import {it} from 'vitest';
import TestHelper from '@test/test-helper';

export class JsonSchemaTestSuiteData {

    constructor(
      jsonSchema,
      examples,
      onlyRequiredProperties,
      withoutRequiredProperties,
      extended,
      wronglyExtended
    ) {
        this.jsonSchema = jsonSchema;
        this.examples = examples;
        this.onlyRequiredProperties = onlyRequiredProperties;
        this.withoutRequiredProperties = withoutRequiredProperties;
        this.extended = extended;
        this.wronglyExtended = wronglyExtended;
    }

}

export class JsonSchemaTestSuiteConfig {

    constructor(
      hasRequiredProperties= false,
      expectedErrorsWhenIsWithoutRequiredProperties= [],
      canBeExtended = true,
      expectedErrorsWhenIsWronglyExtended= [],
    ) {
        this.hasRequiredProperties = hasRequiredProperties;
        this.expectedErrorsWhenIsWithoutRequiredProperties = expectedErrorsWhenIsWithoutRequiredProperties;
        this.canBeExtended = canBeExtended;
        this.expectedErrorsWhenIsWronglyExtended = expectedErrorsWhenIsWronglyExtended;
    }

}

export class JsonSchemaTestSuite {

    data;
    config;

    /**
     * Basic JsonSchema Test Suite.
     *
     * @param data test data
     * @param config test suite config
     */
    constructor(data, config = new JsonSchemaTestSuiteConfig()) {
        this.data = data;
        this.config = config;
    }

    testSuite() {

        for (const example of this.data.examples) {
            it(TestHelper.exampleIsValidTestName, () => TestHelper.objectIsValid(
              this.data.jsonSchema,
              example,
            ));
        }

        if (this.config.hasRequiredProperties) {

            it(TestHelper.cannotBeEmptyTestName, () => TestHelper.objectIsNotValid(
              this.data.jsonSchema,
              {},
              this.config.expectedErrorsWhenIsWithoutRequiredProperties,
            ));

            it(TestHelper.isNotValidWithoutRequiredPropertiesTestName, () => TestHelper.objectIsNotValid(
              this.data.jsonSchema,
              this.data.withoutRequiredProperties,
              this.config.expectedErrorsWhenIsWithoutRequiredProperties
            ));

        } else {

            it(TestHelper.canBeEmptyTestName, () => TestHelper.objectIsValid(
              this.data.jsonSchema,
              {},
            ));

            it(TestHelper.isValidWithoutRequiredPropertiesTestName, () => TestHelper.objectIsValid(
              this.data.jsonSchema,
              this.data.withoutRequiredProperties,
            ));

        }

        it(TestHelper.isValidWithOnlyRequiredPropertiesTestName, () => TestHelper.objectIsValid(
          this.data.jsonSchema,
          this.data.onlyRequiredProperties,
        ));

        it(TestHelper.isValidWhenIsExtendedTestName, () => TestHelper.objectIsValid(
          this.data.jsonSchema,
          this.data.extended,
        ));

        it(TestHelper.isNotValidWhenIsWronglyExtendedTestName, () => TestHelper.wronglyExtended(
          this.data.jsonSchema,
          this.data.wronglyExtended,
        ));

    }

}
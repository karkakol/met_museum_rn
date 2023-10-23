type ValidatorType = 'notEmpty' | 'identical';

type ValidationResult =
  | {valid: true; message: null}
  | {valid: false; message: string};

const ValidationPositive: ValidationResult = {valid: true, message: null};

type ValidationRecord = Record<
  ValidatorType,
  (texts: string[]) => ValidationResult
>;

const ValidationMap: ValidationRecord = {
  notEmpty: anyEmpty,
  identical: allIdentical,
};

function anyEmpty(texts: string[]): ValidationResult {
  return texts.some((text: string) => text.length === 0)
    ? {valid: false, message: 'Field cannot be empty'}
    : ValidationPositive;
}
function allIdentical(texts: string[]): ValidationResult {
  if (texts.length === 0) return ValidationPositive;
  const first = texts[0];
  for (const text of texts) {
    if (text !== first) {
      return {valid: false, message: 'Given fields are different'};
    }
  }
  return ValidationPositive;
}

export const validateTexts = (
  validatorTypes: ValidatorType[],
  texts: string[],
): ValidationResult => {
  for (const validatorType of validatorTypes) {
    const validator = ValidationMap[validatorType];
    const validatorResult = validator(texts);
    if (!validatorResult.valid) return validatorResult;
  }

  return ValidationPositive;
};

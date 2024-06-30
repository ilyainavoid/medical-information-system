import {
    AT_LEAST_A_DIGIT,
    FILL_IN,
    INVALID_EMAIL_INPUT,
    INVALID_PHONE_INPUT,
    MAX_50_LENGTH,
    MIN_6_LENGTH
} from "./strings.ts";
import {DIGIT_IN_PASSWORD, EMAIL, PHONE} from "./regularExpressions.ts";
class Validation {
    static requireRule = (errorMessage: string) => ({
        required: true,
        message: errorMessage
    });

    static inputValidation = (regex: RegExp, errorMessage: string) => ({
        pattern: regex,
        message: errorMessage
    });

    static typeValidation = (type: string, errorMessage: string) => ({
        type: type,
        message: errorMessage
    });

    static minLengthValidation = (minLength: number, errorMessage: string) => ({
        min: minLength,
        message: errorMessage
    });

    static maxLengthValidation = (maxLength: number, errorMessage: string) => ({
        max: maxLength,
        message: errorMessage
    });

    static regexStringValidation = (regex: RegExp, errorMessage: string) => ({
        pattern: regex,
        message: errorMessage
    });
}

export const validationRules = {

    specialityValidation: () => [
      Validation.requireRule(FILL_IN)
    ],

    fullNameValidation: () => [
        Validation.requireRule(FILL_IN),
        Validation.maxLengthValidation(50, MAX_50_LENGTH)
    ],

    genderValidation: () => [
      Validation.requireRule(FILL_IN)
    ],

    phoneValidation: () => [
      Validation.regexStringValidation(PHONE, INVALID_PHONE_INPUT)
    ],

    emailValidation: () => [
        Validation.requireRule(FILL_IN),
        Validation.regexStringValidation(EMAIL, INVALID_EMAIL_INPUT)
    ],

    passwordValidation: () => [
        Validation.requireRule(FILL_IN),
        Validation.minLengthValidation(6, MIN_6_LENGTH),
        Validation.maxLengthValidation(50, MAX_50_LENGTH),
        Validation.regexStringValidation(DIGIT_IN_PASSWORD, AT_LEAST_A_DIGIT)
    ]
}
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CPF: () => CPF
});
module.exports = __toCommonJS(index_exports);

// src/digit.ts
var Digit = class _Digit {
  value;
  constructor(value) {
    if (isNaN(value)) {
      throw new Error("invalid digit");
    }
    this.value = parseInt(value, 10);
  }
  valueOf() {
    return this.value;
  }
  asNumber() {
    return this.value;
  }
  subtract(digit) {
    return new _Digit(this.value - digit.value);
  }
  plus(digit) {
    return new _Digit(digit.value + this.value);
  }
  multiply(digit) {
    return new _Digit(digit.value * this.value);
  }
  divide(digit) {
    const dividend = new _Digit(Math.trunc(this.value / digit.value));
    const remainder = new _Digit(this.value % digit.value);
    return [dividend, remainder];
  }
  greaterThan(digit) {
    return this.value > digit.value;
  }
  lessThan(digit) {
    return !this.greaterThan(digit);
  }
  equalTo(digit) {
    return this.value === digit.value;
  }
};

// src/digits.ts
var Digits = class _Digits {
  digits;
  constructor(input) {
    if (typeof input === "string") {
      this.digits = input.replaceAll(".", "").replace("-", "").split("").map((digit) => new Digit(digit));
      return;
    }
    if (Array.isArray(input) && input.every((digit) => digit instanceof Digit)) {
      this.digits = input;
      return;
    }
    throw new Error("invalid digits");
  }
  asArray() {
    return this.digits;
  }
  asLength() {
    return this.digits.length;
  }
  asString() {
    return this.digits.map((digit) => digit.asNumber()).join("");
  }
  splitAt(index) {
    return new _Digits(this.digits.slice(0, index));
  }
  reverse() {
    return new _Digits(this.digits.reverse());
  }
  mergeWith(digit) {
    return new _Digits([...this.digits, digit]);
  }
  allEquals() {
    return this.digits.every((digit) => digit.equalTo(this.digits[0]));
  }
  pick(ordinal) {
    const digit = this.digits.at(ordinal.value());
    if (!digit) {
      throw new Error("digit not found");
    }
    return digit;
  }
};

// src/calculator.ts
var Calculator = class _Calculator {
  constructor(digits) {
    this.digits = digits;
  }
  multiply() {
    const digits = this.digits.reverse().asArray().map((digit, index) => digit.multiply(new Digit(index + 2)));
    return new _Calculator(new Digits(digits));
  }
  sum() {
    return this.digits.asArray().reduce((prev, curr) => prev.plus(curr));
  }
};

// src/constants.ts
var CPF_LENGTH = 11;

// src/ordinal/last.ts
var Last = class {
  value() {
    return -1;
  }
};

// src/ordinal/secondToLast.ts
var SecondToLast = class {
  value() {
    return -2;
  }
};

// src/verifier.ts
var Verifier = class {
  constructor(calculator) {
    this.calculator = calculator;
  }
  generate() {
    const sum = this.calculator.multiply().sum();
    const [_, remainder] = sum.divide(new Digit(CPF_LENGTH));
    if (remainder.greaterThan(new Digit(2)) || remainder.equalTo(new Digit(2))) {
      return new Digit(CPF_LENGTH).subtract(remainder);
    }
    return new Digit(0);
  }
};

// src/cpf.ts
var CPF = class {
  digits;
  constructor(input) {
    const digits = new Digits(input);
    if (digits.asLength() !== CPF_LENGTH) {
      throw new Error("invalid cpf length");
    }
    if (digits.allEquals()) {
      throw new Error("invalid cpf");
    }
    const firstVerifier = new Verifier(new Calculator(digits.splitAt(9))).generate();
    const lastVerifier = new Verifier(new Calculator(digits.splitAt(9).mergeWith(firstVerifier))).generate();
    if (!firstVerifier.equalTo(digits.pick(new SecondToLast()))) {
      throw new Error("invalid cpf");
    }
    if (!lastVerifier.equalTo(digits.pick(new Last()))) {
      throw new Error("invalid cpf");
    }
    this.digits = digits;
  }
  asFormatted() {
    return this.digits.asString().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }
  asString() {
    return this.digits.asString();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CPF
});

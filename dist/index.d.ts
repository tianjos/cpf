declare class Digit {
    private value;
    constructor(value: any);
    valueOf(): number;
    asNumber(): number;
    subtract(digit: Digit): Digit;
    plus(digit: Digit): Digit;
    multiply(digit: Digit): Digit;
    divide(digit: Digit): [dividend: Digit, remainder: Digit];
    greaterThan(digit: Digit): boolean;
    lessThan(digit: Digit): boolean;
    equalTo(digit: Digit): boolean;
}

interface Ordinal {
    value(): number;
}

declare class Digits {
    private digits;
    constructor(input: Digit[]);
    constructor(input: string);
    asArray(): Digit[];
    asLength(): number;
    asString(): string;
    splitAt(index: number): Digits;
    reverse(): Digits;
    mergeWith(digit: Digit): Digits;
    allEquals(): boolean;
    pick(ordinal: Ordinal): Digit;
}

declare class CPF {
    readonly digits: Digits;
    constructor(input: string);
    asFormatted(): string;
    asString(): string;
}

export { CPF };

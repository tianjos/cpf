import { Calculator } from "./calculator"
import { CPF_LENGTH } from "./constants"
import { Digits } from "./digits"
import { Last } from "./ordinal/last"
import { SecondToLast } from "./ordinal/secondToLast"
import { Verifier } from "./verifier"

export class CPF {
    readonly digits: Digits

    constructor(input: string) {
        const digits = new Digits(input)

        if (digits.asLength() !== CPF_LENGTH) {
            throw new Error('invalid cpf length')
        }

        if (digits.allEquals()) {
            throw new Error('invalid cpf')
        }

        const firstVerifier = new Verifier(new Calculator(digits.splitAt(9))).generate()
        const lastVerifier = new Verifier(new Calculator(digits.splitAt(9).mergeWith(firstVerifier))).generate()

        if (!firstVerifier.equalTo(digits.pick(new SecondToLast()))) {
            throw new Error('invalid cpf')
        }

        if (!lastVerifier.equalTo(digits.pick(new Last()))) {
            throw new Error('invalid cpf')
        }

        this.digits = digits
    }

    asFormatted() {
        return this.digits.asString().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }

    asString() {
        return this.digits.asString()
    }
}
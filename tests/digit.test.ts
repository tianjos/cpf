import { describe, expect, it } from "vitest"
import { Digit } from "../src/digit"

describe('digit', () => {
    it('should instantiate digit successfully with any number', () => {
        const digit = new Digit(10)

        expect(digit).toBeInstanceOf(Digit)
    })

    it('should instantiate digit sucessfully with string that cast to number', () => {
        const digit = new Digit('10')

        expect(digit).toBeInstanceOf(Digit)
    })

    it('should truncate float digit', () => {
        const digit = new Digit(10.5)

        expect(digit.asNumber()).toEqual(10)
    })

    it('should sum two digits', () => {
        const a = new Digit(10)
        const b = new Digit(20)

        const c = a.plus(b)

        expect(c.asNumber()).toEqual(30)
    })

    it('should subtract two digits', () => {
        const a = new Digit(20)
        const b = new Digit(10)

        const c = a.subtract(b)

        expect(c.asNumber()).toEqual(10)
    })

    it('should multiply two digits', () => {
        const a = new Digit(10)
        const b = new Digit(5)

        const c = a.multiply(b)

        expect(c.asNumber()).toEqual(50)
    })

    it('should divide two digits', () => {
        const a = new Digit(10)
        const b = new Digit(2)

        const [dividend, remainder] = a.divide(b)

        expect(dividend.asNumber()).toEqual(5)
        expect(remainder.asNumber()).toEqual(0)
    })

    it('should greater than', () => {
        const a = new Digit(10)
        const b = new Digit(2)

        expect(a.greaterThan(b)).toBe(true)
    })

    it('should less than', () => {
        const a = new Digit(10)
        const b = new Digit(20)

        expect(a.lessThan(b)).toBe(true)
    })

    it('should equal to', () => {
        const a = new Digit(10)
        const b = new Digit(10)

        expect(a.equalTo(b)).toBe(true)
    })

    it('should overload arithmetic operator', () => {
        const a = new Digit(10)
        const b = new Digit(20)

        // @ts-ignore
        expect(a + b).toEqual(30)
    })
})
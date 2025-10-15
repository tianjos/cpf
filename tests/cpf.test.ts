import { describe, expect, it } from "vitest"
import { CPF } from "../src/index"

describe('cpf', () => {
    it('should instantiate cpf successfully with valid cpf formatted', () => {
        const cpf = new CPF('111.444.777-35')

        expect(cpf).toBeInstanceOf(CPF)
    })

    it('should instantiate cpf successfully with valid cpf normalized', () => {
        const cpf = new CPF('11144477735')

        expect(cpf).toBeInstanceOf(CPF)
    })

    it('should return cpf formatted', () => {
        const cpf = new CPF('111.444.777-35')

        expect(cpf.asFormatted()).toEqual('111.444.777-35')
    })

    it('should return cpf normalized', () => {
        const cpf = new CPF('111.444.777-35')

        expect(cpf.asString()).toEqual('11144477735')
    })

    it('should fail with all equal digits', () => {
        expect(() => new CPF('111.111.111-11')).toThrow('invalid cpf')
    })

    it('should fail with invalid cpf', () => {
        expect(() => new CPF('111.444.777-05')).toThrow('invalid cpf')
    })

    it('should fail with invalid cpf length', () => {
        expect(() => new CPF('111.444.777')).toThrow('invalid cpf length')
    })
})
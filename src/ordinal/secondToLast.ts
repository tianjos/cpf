import { Ordinal } from "./ordinal"

export class SecondToLast implements Ordinal {
    value(): number {
        return -2
    }
}
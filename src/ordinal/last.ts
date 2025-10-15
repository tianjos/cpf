import { Ordinal } from "./ordinal"

export class Last implements Ordinal {
    value(): number {
        return -1
    }
}
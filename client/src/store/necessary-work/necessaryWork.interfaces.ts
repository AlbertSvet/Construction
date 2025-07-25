import { Work } from "../../interfaces-global/work.interfaces"
import { getDataParams } from "../../interfaces-global/getDataParams"

interface CheckedInput {
    name: string,
    id: string,
    checked: boolean 
}

export interface NecessaryWork {
    work: Work[],
    status: boolean
    updateWork: (data: CheckedInput) => void
    getNecessaryWork: (data: getDataParams) => Promise<void>
}
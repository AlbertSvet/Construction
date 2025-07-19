import { Work } from "../../interfaces-global/work.interfaces"
import { RequestParams } from "../../interfaces-global/requestParams.interfaces"

interface CheckedInput {
    name: string,
    id: string,
    checked: boolean 
}

export interface NecessaryWork {
    work: Work[],
    status: boolean
    updateWork: (data: CheckedInput) => void
    getNecessaryWork: (data: RequestParams) => Promise<void>
}
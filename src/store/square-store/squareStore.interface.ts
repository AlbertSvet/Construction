import { SquareItem } from "../../interfaces-global/squareItem.interfaces"
import { RequestParams } from "../../interfaces-global/requestParams.interfaces"
export interface Square {
    status: boolean,
    ceilingHeight: number,
    squareData: SquareItem[],
    totalArea: number ,
    updateTotalArea: (data:SquareItem[]) => void
    getCeilingHeight: (num: number) => void,
    updateSquareData: (data:SquareItem) => void,
    getSquareData:  (data:RequestParams) => Promise<SquareItem[] | undefined>
}
import { SquareItem } from "../../interfaces-global/squareItem.interfaces"
import { getDataParams } from "../../interfaces-global/getDataParams"

export interface Square {
    status: boolean,
    ceilingHeight: number,
    squareData: SquareItem[],
    totalArea: number ,
    updateTotalArea: (data:SquareItem[]) => void
    getCeilingHeight: (num: number) => void,
    updateSquareData: (data:SquareItem) => void,
    getSquareData:  (data:getDataParams) => Promise<SquareItem[] | undefined>
}
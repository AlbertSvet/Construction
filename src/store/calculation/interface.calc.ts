import { Work } from "../../interfaces-global/work.interfaces"
import { SquareItem } from "../../interfaces-global/squareItem.interfaces"
import { RequestParams } from "../../interfaces-global/requestParams.interfaces"
export  interface Calculation {
    totalPrice: number,
    totalUsdPrice: number,
    priceCalculation: (totalSquare: number, totalCheckWork:Work[], ceilingHeight: number, squareData:SquareItem[]) => void,
    getExchangeRat: (url: string) => Promise<any>,
    updateTotalUsdPrice: (calc: () => number) => void
}
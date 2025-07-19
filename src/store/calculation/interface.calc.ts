import { Work } from "../../interfaces-global/work.interfaces"
import { SquareItem } from "../../interfaces-global/squareItem.interfaces"

export  interface Calculation {
    totalPrice: number,
    priceCalculation: (totalSquare: number, totalCheckWork:Work[], ceilingHeight: number, squareData:SquareItem[]) => void,
    getExchangeRat: (url: string) => Promise<any>
}
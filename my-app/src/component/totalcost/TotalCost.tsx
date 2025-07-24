import './totalCost.scss'
import { squareStore,necessaryWork,calculation } from '../../store/store'
import { useEffect, useState} from 'react'



const TotalCost = () =>{
    // сумма площади 
    const totalArea = squareStore((state)=> state.totalArea) // сумма площади всех
    const updateTotalArea = squareStore((state) => state.updateTotalArea)
    const squareData = squareStore((state)=>state.squareData); // массив площади
    const work = necessaryWork((state)=>state.work); // массив выбранных работ

    const totalPrice = calculation((state)=> state.totalPrice);// итоговая цена
    const priceCalculation = calculation((state)=>state.priceCalculation)// главный расчет итоговой цены

    const ceilingHeight = squareStore((state)=> state.ceilingHeight) // высота потолка

    


    useEffect(()=>{
        updateTotalArea(squareData)
    },[squareData])

    useEffect(()=>{
        priceCalculation(totalArea, work, ceilingHeight, squareData)
    },[totalArea, work, ceilingHeight])


     // метод получения курса валют
    const getExchangeRat = calculation((state)=> state.getExchangeRat)
    // обновление итога в usd 
    const updateTotalUsdPrice = calculation((state)=> state.updateTotalUsdPrice);
 
   
    const [usdRate, setUsdRate] = useState<number | null>(null)

    const fetchRate = async () =>{
        const data = await getExchangeRat('https://open.er-api.com/v6/latest/USD')
        setUsdRate(data.rates.RUB)
    }
    const usdRateRub = () =>{
        if(usdRate !== null){
            let usd = +(totalPrice / usdRate).toFixed(2)
            return usd
        }
        return 0
    }
    useEffect(()=>{
        updateTotalUsdPrice(usdRateRub)
    },[totalPrice])

    useEffect(()=>{
        fetchRate()
    },[])  

   
    return(
        <div className='mainCalculator__totalCost totalCost'>
            <p className='totalCost__total-rub'>{totalPrice} руб</p>
            <p className='totalCost__text'>Примерная общая стоимость работ</p>
            <p className='totalCost__total-usd'>{usdRateRub()} usd</p>
            <p className='totalCost__text'>Сумма в долларах США по текущему курсу - {usdRate?.toFixed(2)}</p>
        </div>
    )
}

export default TotalCost
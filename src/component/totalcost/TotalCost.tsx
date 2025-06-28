import './totalCost.scss'
import { squareStore } from '../../store/store'
import { useEffect } from 'react'


const TotalCost = () =>{
    // сумма площади 
    const totalArea = squareStore((state)=> state.totalArea)
    const updateTotalArea = squareStore((state) => state.updateTotalArea)
    const squareData = squareStore((state)=>state.squareData);
    useEffect(()=>{
        updateTotalArea(squareData)
    },[squareData])
    // const squareData = squareStore((state) => state.squareData);
    // const work = necessaryWork((state)=>state.work);

    // let chekWork = 0; // количествой отмеченных чекбоксов
    // work.forEach(item =>{
    //     if(item.checked && item.count === '20'){
    //        chekWork++
    //     }
    // })
    // let countSq = 0; // сумма площади выбранных комнат
    // squareData.forEach((item) =>{
    //     if(item.value !== 0){

    //         countSq += item.value
    //     }
    // })
    // //  let total = 0;
    //  const total = useMemo(()=>{
    //         if(chekWork > 0) {
    //          return countSq * (20 * chekWork)
    //         }
    //  },[chekWork])
    
   
   
    return(
        <div className='mainCalculator__totalCost totalCost'>
            <p className='totalCost__total-rub'>{totalArea} руб</p>
            <p className='totalCost__text'>Примерная общая стоимость работ</p>
            <p className='totalCost__total-usd'>0 usd</p>
            <p className='totalCost__text'>Сумма в долларах США по текущему курсу</p>
        </div>
    )
}

export default TotalCost
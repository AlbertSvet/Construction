import './totalCost.scss'
import { squareStore,necessaryWork,calculation } from '../../store/store'
import { useEffect } from 'react'


const TotalCost = () =>{
    // сумма площади 
    const totalArea = squareStore((state)=> state.totalArea)
    const updateTotalArea = squareStore((state) => state.updateTotalArea)
    const squareData = squareStore((state)=>state.squareData);
    const work = necessaryWork((state)=>state.work);

    const totalPrice = calculation((state)=> state.totalPrice);
    const priceCalculation = calculation((state)=>state.priceCalculation)

    useEffect(()=>{
        updateTotalArea(squareData)
    },[squareData])
    useEffect(()=>{
        priceCalculation(totalArea, work)
    },[totalArea, work])
 // демонтаж,  зачистка старой отделки, натяжной или гипсокартонный потолок, покраска потолка, шпаклевка потолка, стяжка пола, укладка ламината 
    // const workCheked = work.filter((item)=>{
    //     if(item.checked){
    //         switch (item.id){
    //             case 'destruction': 
    //                 return item
    //             case 'ceilings':
    //                 return item
    //             case 'paint_ceiling':
    //                 return item
    //             case 'putty_ceiling':
    //                 return item
    //             case 'floor_screed':
    //                 return item
    //             case 'laminate':
    //                 return item

    //         }
    //     }
       
    // })
  
    // const totalCount = () =>{
    //    return totalArea * (20 * workCheked.length)
    // }

    // const squareData = squareStore((state) => state.squareData);

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
            <p className='totalCost__total-rub'>{totalPrice} руб</p>
            <p className='totalCost__text'>Примерная общая стоимость работ</p>
            <p className='totalCost__total-usd'>0 usd</p>
            <p className='totalCost__text'>Сумма в долларах США по текущему курсу</p>
        </div>
    )
}

export default TotalCost
import {create} from 'zustand'
import { Calculation } from './interface.calc'
import request from '../../services/http.hook'


const calculation = create<Calculation>((set)=>({
    totalPrice: 0,
    totalUsdPrice: 0,
    priceCalculation: (totalSquare, totalCheckWork, ceilingHeight, squareData) =>{

        // разводка и установка сантехники электричество и вставка входной двери добавляют
        const installationPlumbingElectrical = totalCheckWork.reduce((acc,item)=>{
             const wallJobs = [
                "Разводка, установка сантехники",
                "Электрика: розетки, выключ., свет",
                "Вставка входной двери"
            ]
            if(item.checked && wallJobs.includes(item.name)){                
               return acc + +item.count
            }else{
                return acc
            }
           

        },0)

        // санузел (ванна или душ) и санузел (туалет)
                //  метод получения суммы ванна и душ и туалет
                const totalAreaBathroom = squareData.reduce((acc, item) =>{
                    const wallJobs = [
                        "Санузел (ванная или душ)",
                        "Санузел (туалет)"
                    ]
                    if(wallJobs.includes(item.name)){
                        return acc + item.value
                    }else{
                        return acc
                    }
                },  0)
               
            const totalCostBathroom = totalCheckWork.reduce((acc, item)=>{
                    if(item.checked && item.name === "Плитка санузлы, пол кухни, коридор"){
                        return acc + (totalAreaBathroom * 20)
                    }else{
                        return acc
                    }
            },0)
        // откосы оконные и вставка межкомнатных дверей
        const totalPriceSlopesAndInterior = totalCheckWork.reduce((acc,item)=>{

            if(item.checked && item.name === "Откосы оконные"){
                const windowRatio = totalSquare / 7.5
                let windowCount = Math.floor(windowRatio)
                const remaider = windowRatio - windowCount
                if(remaider >= 0.5) {
                    windowCount +=1
                }
               return acc + windowCount * 20

                
            
            }
             // Вставка межкомнатных дверей
            if (item.checked && item.name === "Вставка межкомнатных дверей") {
                const doorsRatio = totalSquare / 25;
                let doorsCount = Math.floor(doorsRatio);

                const remainder = doorsRatio - doorsCount;
                if (remainder >= 0.5) {
                    doorsCount += 1;
                }

                return acc + doorsCount * 10000; 
            }

            return acc

        },0);

        // потолочный плинтус и установка плинтуса на пол
        const totaPriceCalculatThird = totalCheckWork.reduce((acc,item)=>{
            const wallJobs = [
                "Плинтус потолочный",
                "Установка плинтуса на пол"
            ]
            if(item.checked && wallJobs.includes(item.name)){
                return acc + (4 * +Math.sqrt(totalSquare).toFixed(1)) * 20
            }else{
                return acc
            }
            
        },0)

        // штукатурка стен, шпаклевка стен, поклейка обоев, покраска стен
         const totaPriceCalculatSecond = totalCheckWork.reduce((acc,item)=>{
           const wallJobs = [
                "Штукатурка стен",
                "Шпаклевка стен",
                "Поклейка обоев",
                "Покраска стен"
            ]
            if(item.checked && wallJobs.includes(item.name)){   
                         
                const root = +Math.sqrt(totalSquare).toFixed(1)
                return acc + (4 * ( root * ceilingHeight)) * 20
            }else{
                return acc
            }   
        },0)

        const totalPriceCalculatFirst  = totalCheckWork.reduce((acc, item)=>{
             const wallJobs = [
                "Демонтаж, зачистка старой отделки", 
                "Зачистка старой отделки", 
                "Натяжной или гипсокартонный потолок", 
                "Покраска потолка", 
                "Шпаклевка потолка", 
                "Стяжка пола", 
                "Укладка ламината"
            ]
            if(item.checked === true && wallJobs.includes(item.name)) {
                  return acc + totalSquare * 20
            }else{
                return acc
            }
        },0) ;

        // итог
        const totalCalc = totalPriceCalculatFirst + totaPriceCalculatSecond + totaPriceCalculatThird + totalPriceSlopesAndInterior + totalCostBathroom + installationPlumbingElectrical
       
        set(() => ({
            totalPrice: totalCalc
        }))
    },
    getExchangeRat: async (url) => {
        //  не смог переиспользовать метод ошибка сервера Access to fetch at 'https://open.er-api.com/v6/latest/USD' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.Understand this error
        // const response = await request({url})   
        // return await response.json();     
        try{
            let response = await fetch(url,{
                method: 'GET'
            })
            if(!response.ok){
                throw new Error('Ошибка ответа от сервера')
            }
            return await response.json();
            

        }catch(e){
            console.log(e)
            throw new Error ('что то пошло не так')
        }
        
        
    },
    updateTotalUsdPrice: (usdRateRub) =>{
           set(()=>({
                totalUsdPrice: usdRateRub()
           })) 
    }
   
}))

export default calculation
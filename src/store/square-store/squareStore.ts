import {create} from 'zustand'
import { Square } from "./squareStore.interface"

// получение данных Площади
const squareStore = create<Square>((set) => ({
    status: false,
    
    // высота потолка//
    ceilingHeight: 0,
    // метод получения высоты потолка
    getCeilingHeight: (num) => {
       set(()=>({
            ceilingHeight: num
       }))
    },
    // сумма всей площади//
    totalArea: 0,
    // метод суммы всей площади
    updateTotalArea: (data)=>{
       const total = data.reduce((acc, item)=>{
           return acc + item.value
       },0)
       set(()=>({
        totalArea: total
       }))
    },
    squareData: [],
    
    updateSquareData: (data) =>{
        set((prevState)=>({
            squareData: prevState.squareData.map((item) => {
                if(item.id === data.id){
                    return {
                        name: data.name,
                        value: data.value,
                        id: data.id
                    }
                }else{
                        return item
                    }
            })
        }))
    } ,
    getSquareData: async ({url,method = 'GET',  headers = { "Content-Type": "application/json" }}) => {
        try{
            const response = await fetch(url, {
            method: method,
            headers: headers
         })
            if(!response.ok){
                throw new Error ('Ошибка')
            }
            const data = await response.json();
            set(()=>({
                status: true,
                squareData: [...data]
            }))
            return data
        }catch(e){
            set(() => ({
            status: true
        }))
            console.log(e)
        }
        
    }
}))
export default squareStore
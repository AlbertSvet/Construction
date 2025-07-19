import {create} from 'zustand'

import { NecessaryWork } from "./necessaryWork.interfaces"

//  получение данных работ 
const necessaryWork = create<NecessaryWork>((set)=>({
    work: [],
    status: false,
    updateWork: (data) =>{
        set((prevState) =>({
            work: prevState.work.map(item =>{
                if(item.id === data.id){
                    return{
                        ...item,
                        checked: data.checked
                    }
                }else{
                    return item
                }
            })
        }))
    },
    getNecessaryWork: async ({url, method = 'GET', headers = { "Content-Type": "application/json" }}) =>{
        try {
            let response = await fetch(url, {
            method:  method,
            headers: headers
        })
            if(!response.ok) {
                throw new Error('Ошибака')
            }
            const data = await response.json();
            set(() => ({
                work: [...data],
                status: true
            }))
        } catch (error) {
            throw new Error ('Ошибка')
        }
       
    }
}))

export default necessaryWork
import {create} from 'zustand'

import { NecessaryWork } from "./necessaryWork.interfaces"
import request from '../../services/http.hook'
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
    getNecessaryWork: async ({url}) =>{        
        try {
            const response = await request({url});                    
            const data = await response.json();
            set(() => ({
                work: [...data],
                status: true
            }))
        }catch(e){
            throw e 
        }
       
       
    }
}))

export default necessaryWork
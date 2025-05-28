
import useServ from "../service/serv";
import {create} from 'zustand'

const {useGet, usePost} = useServ()
interface User {
    [key:string]: string
}
interface Todos {
    zusForm: User[],
    loading: boolean,
    status: boolean,
    zusGet: () => Promise<void>
}

const useTodos = create<Todos>((set) =>({
    zusForm: [
        {name:'', password:''}
    ],
    loading: false,
    status: false,
    zusGet: async () => {
        set(()=>{
            return {
                loading: true
            }
        })
        try {
            const data = await useGet();
            set((state) =>({
                zusForm: [...state.zusForm,data],
                loading: false,
                status: true
            }))
        } catch (error) {
            set(()=>{
                return{
                    loading: false,
                    status: false
                }
            })
        }
       
    }
}))

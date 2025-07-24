import {create} from 'zustand'
import { LogOut } from './logout.interface';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase/firebaseConfig';
// выход пользователя
const useOut = create<LogOut>((set)=>({
    loading: false,
    zusOut: async () =>{
        try{
            await signOut(auth)
            console.log("Пользователь вышел");
            set(()=>({
                loading: true
            }))
        }catch(e){
            console.log(e)
            set(()=>({
                loading:false
            }))
        }
       
    }
}))

export default useOut
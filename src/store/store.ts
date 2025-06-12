import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {auth, db} from '../firebase/firebaseConfig'

import {create} from 'zustand'
import { BlobOptions } from "buffer";

interface User {
    [key:string]: string
}
export interface Todos {
    zusForm: User[],
    loading: boolean,
    status: boolean,
    errorMesage: null | boolean,
    changeErrorMesage: ()=> void,
    changeStatus: ()=>void
    zusGet: (data:Record<string, string>) => Promise<void>,
    
}
interface Aut extends Pick<Todos, 'loading'>{
    zusAut: (data:Record<string,string>) => Promise<void>
}
interface LogOut {
    loading: boolean,
    zusOut: () => Promise<void>
}



// Регистрация
 const useStore = create<Todos>((set) =>({
    zusForm: [],
    loading: false,
    status: false,
    errorMesage: false,
    changeErrorMesage: ()=>{
        set((state)=>({
            errorMesage: false
        }))
    },
    changeStatus: ()=>{
        setTimeout(()=>{
             set(()=>({
                status:true
            }))
        },500)
       
    },
    zusGet: async (data) => {
        set(()=>{
            return {
                loading: true
            }
        })
        try {
            const {login, pass} = data;
            const userCred = await createUserWithEmailAndPassword(auth, login, pass);
            const user = userCred.user;
            // console.log('user.uid', user?.uid)
            await setDoc(doc(db, 'users', user.uid),{
                name: login
            })
            
            set((state) =>({
                zusForm: [...state.zusForm,data],
                loading: false,
                status: true,
                errorMesage: false
            }))
        } catch (error) {            
            set(()=>{
                return{
                    loading: false,
                    status: false,
                    errorMesage: true
                }
            })
        }
       
    }
}))

// Авторизация
const useStoreAut = create<Aut>((set) =>({
    loading: false,
   
    zusAut: async (data) =>{
        set(()=>({
            loading: true
        }))
        try{
            const {login, pass} = data
            const userAut = await signInWithEmailAndPassword(auth, login, pass)
            const user = userAut.user
           
            console.log('User logged:', user);
        } catch(e){

            set(()=>({
                loading: false
            }))
            alert('неверный логин или пароль')
            console.log(e)
          
        }
    }
}))

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

export {useStore, useStoreAut, useOut}

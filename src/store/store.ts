import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import {auth, db} from '../firebase/firebaseConfig'

import {create} from 'zustand'

interface User {
    [key:string]: string
}
interface Todos {
    zusForm: User[],
    loading: boolean,
    status: boolean,
    changeStatus: ()=>void
    zusGet: (data:Record<string, string>) => Promise<void>
}
interface Aut extends Pick<Todos, 'loading'>{
    zusAut: (data:Record<string,string>) => Promise<void>
}


// Регистрация
const useStore = create<Todos>((set) =>({
    zusForm: [],
    loading: false,
    status: false,
    changeStatus: ()=>{
        setTimeout(()=>{
             set(()=>({
                status:false
            }))
        },3000)
       
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
                status: true
            }))
        } catch (error) {
            console.log(error)
            set(()=>{
                return{
                    loading: false,
                    status: false
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

            console.log(e)
            throw e
        }
    }
}))

export {useStore, useStoreAut}

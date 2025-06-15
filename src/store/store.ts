import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {auth, db} from '../firebase/firebaseConfig'
import { User } from "firebase/auth";

import {create} from 'zustand'

interface Users {
    [key:string]: string
}
export interface Todos {
    zusForm: Users[],
    loading: boolean,
    status: boolean,
    errorMesage: null | string,
    changeErrorMesage: ()=> void,
    changeStatus: ()=>void
    zusGet: (data:Record<string, string>) => Promise<void>,
    
}
interface Aut extends Pick<Todos, 'loading'>{
    user: User | null,
    authorizationMessage: null | string,
    setUser: (user: User | null) => void,
    clearUser: ()=>void,
    changeAuthMessage: () => void,
    zusAut: (data:Record<string,string>) => Promise<void>
}
interface LogOut {
    loading: boolean,
    zusOut: () => Promise<void>
}

// tabs 
interface Tabs {
    tabIndex: number,   
    changeActive: (index:number)=>void
}


// Регистрация
 const useStore = create<Todos>((set) =>({
    zusForm: [],
    loading: false,
    status: false,
    errorMesage: null,
    changeErrorMesage: ()=>{
        set(()=>({
            errorMesage: null
        }))
    },
    changeStatus: ()=>{
             set((state)=>({
                status: !state.status
            }))
    },
    zusGet: async (data) => {
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
                loading: true,
                errorMesage: 'success'
            }))
        } catch (error) {            
            set(()=>{
                return{
                    loading: false,
                    status: false,
                    errorMesage: 'failure'
                }
            })
        }
       
    }
}))

// Авторизация
const useStoreAut = create<Aut>((set) =>({
    user: null,
    loading: true,
    authorizationMessage: null,
    setUser: (user)=> {
        set(()=>({
            user: user,
            loading: false
        }))
    },
    clearUser: () => {
        set(() =>({
            user: null,
            loading: false
        }))
    },
    changeAuthMessage: () =>{
        set(()=>({
            authorizationMessage: null
        }))
    },
    zusAut: async (data) =>{      
        try{
            const {login, pass} = data
            const userAut = await signInWithEmailAndPassword(auth, login, pass)
            const user = userAut.user
           set(() => ({
                authorizationMessage: 'success'
           }))
        } catch(e){

            set(()=>({
                
                authorizationMessage: 'failure'
            }))
          
        }
    }
}))
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

// табы 
const useTabs = create<Tabs>((set)=> ({
    tabIndex: 0,
    changeActive: (index)=>{
        set(() => ({
            tabIndex: index
        }))
    }
}))

export {useStore, useStoreAut, useOut,useTabs}

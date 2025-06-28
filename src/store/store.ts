import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {auth, db} from '../firebase/firebaseConfig'
import { User } from "firebase/auth";

import {create} from 'zustand'
import { persist } from 'zustand/middleware';

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
interface hd {
    [key: string]: string
}
interface params {
    url: string,
    method?: string,
    headers?: hd
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

interface SquareItem {
    name: string,
    value: number,
    id: string
}
interface Square {
    loading: boolean,
    ceilingHeight: SquareItem,
    squareData: SquareItem[],
    totalArea: number | string,
    updateTotalArea: (data:SquareItem[]) => void
    getCeilingHeight: (data: SquareItem) => void,
    updateSquareData: (data:SquareItem) => void,
    getSquareData:  (data:params) => Promise<SquareItem[] | undefined>
}

// получение данных Площади
const squareStore = create<Square>((set) => ({
    loading: false,
    // высота потолка//
    ceilingHeight: { 
        name: 'height',
        value: 0,
        id: 'ceilingHeight'
    },
    // сумма всей площади//
    totalArea: 0,
    updateTotalArea: (data)=>{
       const total = data.reduce((acc, item)=>{
           return acc + item.value
       },0)
       set(()=>({
        totalArea: total
       }))
    },
    squareData: [],
    getCeilingHeight: (data) => {
       set((prevState)=>({
            ceilingHeight: {...prevState.ceilingHeight, ...data}
       }))
    },
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
    getSquareData: async ({url,method = 'GET',  headers = { "Content-Type": "application/json" }}:params) => {
        set(() => ({
            loading: true
        }))
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
                loading: false,
                squareData: [...data]
            }))
            return data
        }catch(e){
            set(() => ({
            loading: false
        }))
            console.log(e)
        }
        
    }
}))


//  получение данных работ 
interface Work extends Omit<SquareItem, 'value'> {
     count: number | string,
     unit: string,
     checked: boolean
}
interface CheckedInput {
    name: string,
    id: string,
    checked: boolean 
}
interface NecessaryWork {
    work: Work[],
    updateWork: (data: CheckedInput) => void
    getNecessaryWork: (data: params) => Promise<void>
}
const necessaryWork = create<NecessaryWork>((set)=>({
    work: [],
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
    getNecessaryWork: async ({url, method = 'GET', headers = { "Content-Type": "application/json" }}: params) =>{
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
                work: [...data]
            }))
        } catch (error) {
            throw new Error ('Ошибка')
        }
       
    }
}))

export {useStore, useStoreAut, useOut,useTabs, squareStore,necessaryWork}

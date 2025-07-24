import {create} from 'zustand';
import { Todos } from './registration.interface';

import { createUserWithEmailAndPassword } from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../../firebase/firebaseConfig';


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

export default useStore
import {create} from 'zustand';
import { Aut } from './authorization.interface';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth,db } from '../../firebase/firebaseConfig';


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
                authorizationMessage: 'success',
                user:user
           }))
        } catch(e){

            set(()=>({
                authorizationMessage: 'failure'
            }))
          
        }
    }
}))

export default useStoreAut
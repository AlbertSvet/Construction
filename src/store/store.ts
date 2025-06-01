import { createUserWithEmailAndPassword } from "firebase/auth";
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
    zusGet: (data:Record<string, string>) => Promise<void>
}

const useStore = create<Todos>((set) =>({
    zusForm: [],
    loading: false,
    status: false,
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

export default useStore

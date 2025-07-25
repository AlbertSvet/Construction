import { User } from "firebase/auth";

export interface Aut {
    loading: boolean,
    user: User | null,
    authorizationMessage: null | string,
    setUser: (user: User | null) => void,
    clearUser: ()=>void,
    changeAuthMessage: () => void,
    zusAut: (data:Record<string,string>) => Promise<void>
}
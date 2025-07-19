interface Users {
    [key: string]: string
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
import { useCallback } from "react"

type method = "GET" | "POST" | "PATCH"
interface hd {
    [key: string]: string
}
interface params {
    url: string,
    method?: method,
    body?: null | string
    headers?: hd
}

const useHttp =  () =>{

    const request = useCallback(
        async ({url ,method = "GET",body = null, headers = { "Content-Type": "application/json" }}:params) =>{
        try{
                const response = await fetch(url,{
                method: method,
                body: body,
                headers: headers
            })
            if(!response.ok){
                throw new Error ('Error')
            }
            return await response.json()
        }catch(e){
            throw e
        }
       
    },[])
    
    return {request}
}
export  default useHttp

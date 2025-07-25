
import { RequestParams } from "../interfaces-global/requestParams.interfaces"
interface Headers {
[key: string]: string 
}
interface Config {
method: string,
body: string | null,
headers: Headers 
}

const request = async ({url ,method = "GET",body = null, headers = {}}:RequestParams) =>{
        try{

            
            const config: Config ={
                method: method,
                body: body,
                headers: {},
                
            }
            
            if(body && method !== "GET") {
                config.headers["Content-Type"] = "application/json"
            }

            //  если заголовки передадим запишим их 
            Object.assign(config.headers, headers)

            const response = await fetch(url, config)
            if(!response.ok){
                throw new Error ('Error')
            }
             return response
        
    }catch(e){
        throw e
    }
    
}


export  default request

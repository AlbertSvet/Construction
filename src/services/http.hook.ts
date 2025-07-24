
import { RequestParams } from "../interfaces-global/requestParams.interfaces"

const request = async ({url ,method = "GET",body = null, headers = { "Content-Type": "application/json" }}:RequestParams) =>{
        try{
            const response = await fetch(url,{
            method: method,
            body: body,
            headers: headers
        })
        if(!response.ok){
            throw new Error ('Error')
        }
       return response
        
    }catch(e){
        throw e
    }
    
}


export  default request

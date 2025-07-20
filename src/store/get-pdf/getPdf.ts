import {create} from 'zustand';
import { RequestParams } from '../../interfaces-global/requestParams.interfaces';

interface RequestParamsPdf extends RequestParams {
    body: null | string
}

interface StorePd {
    pdf: Blob[],
    postPdf: (data: RequestParamsPdf) => Promise<Blob>
}

const storePdf = create<StorePd>((set)=>({
    pdf: [],
    postPdf: async ({url, method = 'POST', body = null, headers =  { "Content-Type": "application/json" }}:RequestParamsPdf)=>{
        try{
            let response = await fetch(url, {
                method: method,
                body: body,
                headers: headers
            })
            if(!response.ok){
                throw new Error('Ошибка сервера')
            }
            // получаем PDF как blob
            const responsePdf = await response.blob()
            set((prevPdf)=>({
                pdf: [...prevPdf.pdf, responsePdf]
            }))
            return responsePdf
        }catch(e){
            throw e
        }
        
    }
}))

export default storePdf
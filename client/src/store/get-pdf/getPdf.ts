import {create} from 'zustand';
import { RequestParams } from '../../interfaces-global/requestParams.interfaces';
import request from '../../services/http.hook';
import { url } from 'inspector';

interface responseBlob {
    blob: Blob | JSON | Text,    
    fileName:string
}
export interface FilePdfMeta {
  id: string | number,
  fileName: string,
  createdAt: string,
  userEmail: string,
  totalPriceRub: string | number,
  totalUsdPrice: string | number
}
interface postPdf extends RequestParams{
    responseType?: string
}
interface StorePd {
    calculationsPdf: responseBlob[],
    calculationsListPDF: FilePdfMeta[],
    postPdf: (data: postPdf) => Promise<any>,
    getPdf: (data: RequestParams) => void
}


const storePdf = create<StorePd>((set)=>({
    calculationsPdf: [],
    calculationsListPDF: [],
    postPdf: async ({url, method, body, responseType}) => {
        try{
            let response = await request({url,method, body});  
            switch(responseType){
                case 'json':
                    const json = await response.json(); 
                    // set(()=>({
                    //         calculationsListPDF: [...json]
                    // }))
                    return json
                case 'blob':
                    const blob = await response.blob() 
                    return blob
                default:
                    return response
            }
               
            
            // return response    
            // const contentDisp = response.headers.get('Content-Disposition')
            // const fileName = contentDisp?.split('filename=')[1].replace(/"/g, '') || 'default.png';
            // const responsePdf = await response.blob();
            // set((prevState)=>({
            //         calculationsPdf: [...prevState.calculationsPdf, {blob: responsePdf, fileName: fileName}]
            //     }))
            // return responsePdf
            
         
        }catch(e){
            throw e 
        }
        
    },
    getPdf: async({url}) =>{
        try{
            const response = await request({url});
            const responseList = await response.json();
            set(()=>({
                calculationsListPDF: [ ...responseList]
            }))
            // return responseList
        }catch(e){
            throw e 
        }
        
    }
}))


export default storePdf
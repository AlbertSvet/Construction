import {create} from 'zustand';
import { RequestParams } from '../../interfaces-global/requestParams.interfaces';
import request from '../../services/http.hook';
import { url } from 'inspector';

interface responseBlob {
    blob: Blob | JSON | Text,    
    fileName:string
}
interface FilePdfMeta {
  fileName: string;
  createdAt: string;
  userEmail: string;
}

interface StorePd {
    calculationsPdf: responseBlob[],
    calculationsListPDF: FilePdfMeta[],
    postPdf: (data: RequestParams) => Promise<Blob>,
    getPdf: (data: RequestParams) => void
}


const storePdf = create<StorePd>((set)=>({
    calculationsPdf: [],
    calculationsListPDF: [],
    postPdf: async ({url, method, body}) => {
        try{
            let response = await request({url,method, body});            
            const contentDisp = response.headers.get('Content-Disposition')
            const fileName = contentDisp?.split('filename=')[1].replace(/"/g, '') || 'default.png';
            const responsePdf = await response.blob();
            set((prevState)=>({
                    calculationsPdf: [...prevState.calculationsPdf, {blob: responsePdf, fileName: fileName}]
                }))
            return responsePdf
            
         
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

// const storePdf = create<StorePd>((set)=>({
//     calculationsPdf: [],
//     postPdf: async ({url, method = 'POST', body = null, headers =  { "Content-Type": "application/json" }}:RequestParamsPdf)=>{
//         try{
//             let response = await fetch(url, {
//                 method: method,
//                 body: body,
//                 headers: headers
//             })
//             if(!response.ok){
//                 throw new Error('Ошибка сервера')
//             }
//             // получаем PDF как blob
//             const responsePdf = await response.blob();
//             const contentDisp = response.headers.get('Content-Disposition')
//             const fileName = contentDisp?.split('filename=')[1].replace(/"/g, '') || 'default.png';
//             // console.log(contentDisp)
//             set((prevPdf)=>({
//                 calculationsPdf: [...prevPdf.calculationsPdf, {blob: responsePdf, fileName: fileName}]
//             }))
//             return responsePdf
//         }catch(e){
//             throw e
//         }
        
//     }
// }))

export default storePdf
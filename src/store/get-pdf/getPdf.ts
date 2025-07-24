import {create} from 'zustand';
import { RequestParams } from '../../interfaces-global/requestParams.interfaces';
import request from '../../services/http.hook';

interface responseBlob {
    blob: Blob | JSON | Text,    
    fileName:string
}
interface StorePd {
    calculationsPdf: responseBlob[],
    postPdf: (data: RequestParams) => Promise<Blob>
}


const storePdf = create<StorePd>((set)=>({
    calculationsPdf: [],
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
import useHttp from "../hooks/http.hook";

interface data {
    [key: string]: string
}

const useServ = () =>{
    const {request} = useHttp();
    const _apiBase = 'http://localhost:3001/'

    
    //метод получения данных
    const getData = async (url: string) =>{
        const res = await request({url: _apiBase + url})
        return  res
    }

    //  метод отправки данных 
    const postData = async (data:data) =>{
        return await request({
            url: _apiBase,
            method: "POST",
            body: JSON.stringify(data)
        })
       
    }

    return {getData, postData}
}

export default useServ

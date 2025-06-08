import useHttp from "../hooks/http.hook";

interface data {
    [key: string]: string
}

const useServ = () =>{
    const {request} = useHttp();
    const _apiBase = 'sdfsdf'

    
    //метод получения данных
    const useGet = async () =>{
        const res = await request({url: _apiBase})
        return  res
    }

    //  метод отправки данных 
    const usePost = async (data:data) =>{
        return await request({
            url: _apiBase,
            method: "POST",
            body: JSON.stringify(data)
        })
       
    }

    return {useGet, usePost}
}

export default useServ
import { data } from "react-router-dom";
import useHttp from "../hooks/http.hook";

const useServ = () =>{
    const {request} = useHttp();
    const _apiBase = 'sdfsdf'

    
    //метод получения данных
    const useGet = async () =>{
        const res = await request({url: _apiBase})
        return  res
    }

    //  метод отправки данных 
    const usePost = async () =>{
        const res = await request({
            url: _apiBase,
            method: "POST",
            body: JSON.stringify(data)
        })
        return res
    }

    return {useGet, usePost}
}

export default useServ
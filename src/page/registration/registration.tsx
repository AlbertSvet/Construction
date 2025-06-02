import { ChangeEvent, useState, useEffect} from 'react'
import {useStore} from '../../store/store'
import Form from '../../component/registrForm/form';



const Registration = () =>{
    const getFireBase = useStore((state)=> state.zusGet);
    const usersList = useStore((state)=>state.zusForm);

    const [data, setData] = useState<Record<string, string>>({
        login: '',
        pass: ''
    })
    

    const handelChange = (e: ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault();
       
        const {name,value} = e.target;
        setData((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    useEffect(()=>{
        console.log(usersList)
    },[usersList])

    const handelSubmit = async () =>{
        await getFireBase(data)    
           
        setData({
            login: '',
            pass: ''
        })
    }

    return(
        <Form
        data={data}
        handelChange={handelChange}
        handelSubmit={handelSubmit}
        />
    )
}

export default Registration
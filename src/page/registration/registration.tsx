import { ChangeEvent, useState, useEffect} from 'react'
import {useStore} from '../../store/store'
import Form from '../../component/registrForm/form';

interface formData {
    [key: string]:string
}

const Registration = () =>{
    const getFireBase = useStore((state)=> state.zusGet);
    const usersList = useStore((state)=>state.zusForm);

    // const [data, setData] = useState<Record<string, string>>({
    //     login: '',
    //     pass: ''
    // })
    

    // const handelChange = (e: ChangeEvent<HTMLInputElement>) =>{
    //     e.preventDefault();
       
    //     const {name,value} = e.target;
    //     setData((prev)=>({
    //         ...prev,
    //         [name]: value
    //     }))
    // }

    useEffect(()=>{
        console.log(usersList)
    },[usersList])

    const onSubmit = async (formData:formData) =>{
        await getFireBase(formData)    
           
    }

    return(
        <Form
        // handelChange={handelChange}
        onSubmit={onSubmit}
        />
    )
}

export default Registration
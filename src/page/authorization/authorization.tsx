import AuthorizationForm from "../../component/authorizationForm/AuthorizationForm"
import { ChangeEvent } from 'react'
import { useState } from 'react'
import { useStoreAut } from '../../store/store'


const Authorization = () =>{
    const authorization = useStoreAut((state)=>state.zusAut)


    const [dataAut, setDataAut] = useState<Record<string, string>>({
            login: '',
            pass: ''
        })

        const handelChange = (e: ChangeEvent<HTMLInputElement>) =>{
            const {name, value} = e.target;
            setDataAut((state)=>({
                ...state,
                [name]: value
            }))
        }

        const handelSubmit = async () =>{            
          await authorization(dataAut)
          setDataAut({
            login: '',
            pass: ''
          })
        }

    return(
       <AuthorizationForm handelChange={handelChange} handelSubmit={handelSubmit} dataAut={dataAut}/>
    )
}

export default Authorization
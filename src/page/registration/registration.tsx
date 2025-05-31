import { ChangeEvent, useState} from 'react'
import useStore from '../../store/store'
import './regist.scss'



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

    const handelSubmit = () =>{
           getFireBase(data)    
           .then(()=>{
            setData({
                login: '',
                pass: ''
            })
            console.log(usersList)
           })            
        
    }

    return(
        <section className='registration'>
            <div className='registration__container _container'>
                <h1 className='registration__title'>Регистрация администратора</h1>
                <div className='registration__block-form'>
                    <form action="#">
                        <div className='registration__block-input'>
                            <label className='registration__lb' htmlFor='login'>Логин (почта)</label>
                            <input 
                            onChange={handelChange} 
                            className='registration__inp' 
                            value={data.login} 
                            type="text" 
                            name="login" 
                            id='login'/>
                        </div>
                        <div className='registration__block-input'>
                            <label className='registration__lb' htmlFor='pass'>Пароль</label>
                            <input                          
                            onChange={handelChange} 
                            className='registration__inp' 
                             value={data.pass} 
                            type="text" 
                            name="pass" 
                            id='pass'/>
                        </div>
                        <button onClick={handelSubmit} type="button">Регистрация</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Registration
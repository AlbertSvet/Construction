import { useEffect} from 'react'
import {useStore} from '../../store/store'
import { useForm} from "react-hook-form"
import { Link } from 'react-router-dom'
import './regist.scss'
// import Form from '../../component/registrForm/form';

interface formData {
    [key: string]:string
}

const Registration = () =>{
    const getFireBase = useStore((state)=> state.zusGet);
    const usersList = useStore((state)=>state.zusForm);
    const changeStatus = useStore((state)=>state.changeStatus)
    const statusRegistration = useStore((state) => state.status)
    
     const { register, handleSubmit, formState: {errors}, clearErrors,reset} = useForm({
            mode: 'onBlur',
        });

    useEffect(()=>{
        console.log(usersList)
       
    },[usersList])

    const onSubmit = async (formData:formData) =>{
        try {
            await getFireBase(formData);  
            changeStatus();
            setTimeout(()=>{
                reset({
                    login: '',
                    pass: ''
                })
            },3000)
           
        }catch(e){
            console.log(e)
            throw e
        }
        
    }

    return(
        <section className='registration'>
                    <div className='registration__container _container'>
                        <h1 className='registration__title'>Регистрация администратора</h1>
                        <div className='registration__block-form'>
                            
                            {statusRegistration && <p className='registration__success'>Регистрация прошла успешно</p>}
                            <form action="#">
                                <div className='registration__block-input'>
                                    
                                    <label className='registration__lb' htmlFor='login'>Логин (почта)</label>
                                    <input 
                                    {...register('login', {
                                        required: "Email обязателен", 
                                        minLength: {
                                            value: 6,
                                            message: 'Минимум 6 символов'
                                        },
                                    })}
                                    onBlur={()=>clearErrors('login')}
                                    placeholder='email'
                                    className='registration__inp' 
                                    type="text" 
                                    name="login" 
                                    id='login'
                                    style={errors.login && {'border': '1px solid red'}}
                                    />
                                    {errors.login &&  <p style={{'color': 'red', 'fontSize': '18px', 'marginTop': '5px'}}>{errors.login?.message as string}</p>}
                                </div>
                                <div className='registration__block-input'>
                                    <label className='registration__lb' htmlFor='pass'>Пароль</label>
                                    <input  
                                    {...register('pass', {
                                        required: "Пароль обязателен", 
                                        minLength:{
                                            value: 5,
                                            message: 'Минимум 5 символов'
                                        }})
                                    }
                                    onBlur={()=>clearErrors('pass')}
                                   
                                    placeholder='pass'                        
                                    className='registration__inp' 
                                    type="text" 
                                    name="pass" 
                                    id='pass'
                                    style={errors.login && {'border': '1px solid red'}}/>
                                    {errors.pass && <p style={{'color': 'red', 'fontSize': '18px', 'marginTop': '5px'}}>{errors.pass?.message as string}</p>}
        
                                </div>
                                <button 
                                onClick={handleSubmit(onSubmit)} 
                                type="button">Зарегистрироваться</button>
                            </form>
                            <div className='block-link'>
                                <Link className='link' to={'/authorization'}>Авторизация</Link>
                            </div>
                        </div>
                    </div>
                </section>
    )
}

export default Registration
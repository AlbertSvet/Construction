import { useEffect} from 'react'
import {useStore} from '../../store/store'
import { useForm} from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'

import { shallow } from 'zustand/shallow';
import './registration.scss'

interface formData {
    [key: string]:string
}

const Registration = () =>{  
    const zusForm = useStore((state) => state.zusForm)
    const statusRegistration = useStore((state) => state.status)
    const errorMesages = useStore((state) => state.errorMesage)
    const getFireBase = useStore((state) => state.zusGet)
    const changeErrorMesage = useStore((state) => state.changeErrorMesage)
    // не совсем понял почему происходит бесконечный рендер при таком способе деструктуризации. 
    // решение использовать  shallow. но и тут возникает ошибка 
    // const {
    //     zusForm,
    //     loading,
    //     statusRegistration,
    //     errorMesages,
    //     changeErrorMesag,
    //     changeStatus, 
    //     getFireBase,
              
    //     } = useStore(
    //         (state)=>({
    //         zusForm: state.zusForm,
    //         loading: state.loading,
    //         statusRegistration: state.status,
    //         errorMesages: state.errorMesage,
    //         changeErrorMesag:state.changeErrorMesage,
    //         changeStatus: state.changeStatus,
    //         getFireBase: state.zusGet,
            

    //     }),
    //     // shallow
    // ); 
  



    const navigate = useNavigate();
    const { register, handleSubmit, formState: {errors}, clearErrors,reset} = useForm({
        mode: 'onBlur',
    });

    // ====================
  const onSubmit = async (formData:formData) =>{
            await getFireBase(formData);  
    }
    useEffect(()=>{

        if(statusRegistration){
            setTimeout(()=>{
                reset({
                    login: '',
                    pass: ''
                })
                navigate('/authorization')                
                },1000)
            
            }else{
                setTimeout(()=>{
                changeErrorMesage()
                reset({
                    login: '',
                    pass: ''
                })
                },1300)
            }
    
    },[statusRegistration, errorMesages])

  

    return(
        <section className='registration'>
                    <div className='registration__container _container'>
                        <h1 className='registration__title'>Регистрация администратора</h1>
                        <div className='registration__block-form'>
                        {statusRegistration ? <p className='registration__success'>Регистрация прошла успешно</p> : ''}
                        {errorMesages ? <p className='registration__success'>Пользователь существует</p> : ''}
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
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Введите корректный email'
                                        }
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
                                            value: 8,
                                            message: 'Минимум 8 символов'
                                        }})
                                    }
                                    onBlur={()=>clearErrors('pass')}
                                   
                                    placeholder='pass'                        
                                    className='registration__inp' 
                                    type="text" 
                                    name="pass" 
                                    id='pass'
                                    style={errors.pass && {'border': '1px solid red'}}/>
                                    {errors.pass && <p style={{'color': 'red', 'fontSize': '18px', 'marginTop': '5px'}}>{errors.pass?.message as string}</p>}
        
                                </div>
                                <button 
                                onClick={handleSubmit(onSubmit)} 
                                type="button"
                                disabled =  {statusRegistration}
                                >Зарегистрироваться</button>
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
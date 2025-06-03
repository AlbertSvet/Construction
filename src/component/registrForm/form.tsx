import { ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form"
import './form.scss'
import { error } from 'console'


interface params {
    onSubmit: (formData:obj) => Promise<void>,
}
type obj = Record<string, string>

const Form = ({onSubmit}: params) =>{
    const { register, handleSubmit, formState: {errors}, clearErrors } = useForm({
        mode: 'onBlur',
    });

    return (
        <section className='registration'>
            <div className='registration__container _container'>
                <h1 className='registration__title'>Регистрация администратора</h1>
                <div className='registration__block-form'>
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
                            id='login'/>
                            {errors.login && <p style={{'color': 'red', 'fontSize': '18px', 'marginTop': '5px'}}>{errors.login?.message as string}</p>}
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
                            id='pass'/>
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

export default Form
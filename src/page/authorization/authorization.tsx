import { Link } from 'react-router-dom'
import { useForm} from "react-hook-form"
import { useStoreAut } from '../../store/store'
import { useNavigate } from 'react-router-dom';
import './authorization.scss';

interface formData {
  [key: string]: string
}

const Authorization = () =>{
    const authorization = useStoreAut((state)=>state.zusAut)
    const navigate = useNavigate();
    const { register, handleSubmit, formState: {errors}, clearErrors,reset} = useForm({
            mode: 'onBlur',
        });

        const onSubmit = async (formData:formData) =>{            
          await authorization(formData)
           setTimeout(()=>{
                reset({
                    login: '',
                    pass: ''
                })
                navigate('/main-calculator')
            },500)
        }

    return(
        <section className='registration'>
            <div className='registration__container _container'>
                <h1 className='registration__title'>Авторизация администратора</h1>
                <div className='registration__block-form'>
                    <form action="#">
                        <div className='registration__block-input'>
                            <label className='registration__lb' htmlFor='login'>Введите Логин</label>
                            <input 
                             {...register('login', {
                                required: "Email обязателен", 
                                minLength: {
                                    value: 6,
                                    message: 'Минимум 6 символов'
                                },
                              })}
                            style={errors.login && {'border': '1px solid red'}}
                            onBlur={()=>clearErrors('login')}
                            className='registration__inp' 
                            placeholder='login'
                            type="text" 
                            name="login" 
                            id='login'/>
                            {errors.login &&  <p style={{'color': 'red', 'fontSize': '18px', 'marginTop': '5px'}}>{errors.login?.message as string}</p>}
                        </div>
                        <div className='registration__block-input'>
                            <label className='registration__lb' htmlFor='pass'>Введите Пароль</label>
                            <input                          
                               {...register('pass', {
                                required: "Пароль обязателен", 
                                minLength: {
                                    value: 6,
                                    message: 'Минимум 6 символов'
                                },
                              })}
                            style={errors.pass && {'border': '1px solid red'}}
                            onBlur={()=>clearErrors('pass')}
                            className='registration__inp' 
                            placeholder='pass'
                            type="text" 
                            name="pass" 
                            id='pass'/>
                             {errors.pass &&  <p style={{'color': 'red', 'fontSize': '18px', 'marginTop': '5px'}}>{errors.pass?.message as string}</p>}
                        </div>
                        <button     
                        onClick={handleSubmit(onSubmit)}                                      
                        type="button">Войти</button>
                    </form>
                    <div className='block-link'>
                       <Link to={'/'}>Регистрация</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Authorization
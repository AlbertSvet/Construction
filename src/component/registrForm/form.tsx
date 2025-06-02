import { ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import './form.scss'


interface params {
    handelChange: (e: ChangeEvent<HTMLInputElement>)=> void,
    handelSubmit: ()=> {},
    data: obj
}
type obj = Record<string, string>

const Form = ({handelChange,handelSubmit,data}: params) =>{
    return (
        <section className='registration'>
            <div className='registration__container _container'>
                <h1 className='registration__title'>Регистрация администратора</h1>
                <div className='registration__block-form'>
                    <form action="#">
                        <div className='registration__block-input'>
                            <label className='registration__lb' htmlFor='login'>Логин (почта)</label>
                            <input 
                            placeholder='email'
                            onChange={(e)=>handelChange(e)} 
                            className='registration__inp' 
                            value={data.login} 
                            type="text" 
                            name="login" 
                            id='login'/>
                        </div>
                        <div className='registration__block-input'>
                            <label className='registration__lb' htmlFor='pass'>Пароль</label>
                            <input  
                            placeholder='pass'                        
                            onChange={(e)=>handelChange(e)} 
                            className='registration__inp' 
                             value={data.pass} 
                            type="text" 
                            name="pass" 
                            id='pass'/>
                        </div>
                        <button 
                        onClick={handelSubmit} 
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
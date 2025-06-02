import { Link } from 'react-router-dom'
import { ChangeEvent } from 'react'
import './authorization.scss'
interface obj {
    [keys: string]: string
}
interface params {
    handelChange: (e:ChangeEvent<HTMLInputElement>) => void,
    handelSubmit: ()=> {},
    dataAut: obj
}


const AuthorizationForm = ({handelChange,handelSubmit, dataAut}:params) =>{

   

    return(
        <section className='registration'>
            <div className='registration__container _container'>
                <h1 className='registration__title'>Авторизация администратора</h1>
                <div className='registration__block-form'>
                    <form action="#">
                        <div className='registration__block-input'>
                            <label className='registration__lb' htmlFor='login'>Введите Логин</label>
                            <input 
                            onChange={(e) =>handelChange(e)}
                            value={dataAut.login}
                            className='registration__inp' 
                            placeholder='login'
                            type="text" 
                            name="login" 
                            id='login'/>
                        </div>
                        <div className='registration__block-input'>
                            <label className='registration__lb' htmlFor='pass'>Введите Пароль</label>
                            <input                          
                             onChange={(e) => handelChange(e)}
                             value={dataAut.pass}
                            className='registration__inp' 
                            placeholder='pass'
                            type="text" 
                            name="pass" 
                            id='pass'/>
                        </div>
                        <button     
                        onClick={handelSubmit}                                      
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

export default AuthorizationForm
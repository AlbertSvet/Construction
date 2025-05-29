import './regist.scss'

const Registration = () =>{
    return(
        <section className='registration'>
            <div className='registration__container _container'>
                <h1 className='registration__title'>Регистрация администратора</h1>
                <div className='registration__block-form'>
                    <form action="#">
                        <div className='registration__block-input'>
                            <label className='registration__lb' htmlFor='login'>Логин (почта)</label>
                            <input className='registration__inp' type="text" name="login" id='login'/>
                        </div>
                        <div className='registration__block-input'>
                            <label className='registration__lb' htmlFor='pass'>Пароль</label>
                            <input className='registration__inp' type="text" name="pass" id='pass'/>
                        </div>
                        <button type="button">Регистрация</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Registration
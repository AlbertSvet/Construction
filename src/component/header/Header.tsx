import './header.scss'

const Header = () =>{
    return(
       <div className='header'>
            <div className='header__container _container'>
                <ul className='header__list'>
                    <li className='header__li'>Калькулятор</li>
                    <li className='header__li'>Cтоимости ремонта</li>
                </ul>
            </div>
       </div>
    )
}

export default Header
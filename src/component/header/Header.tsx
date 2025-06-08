import './header.scss'
import { useLocation } from 'react-router-dom'

const Header = () =>{
   const {pathname} = useLocation();
    
    return(
        <>
            {(pathname === '/' || pathname === '/authorization') ? '' : <div className='header'>
            <div className='header__container _container'>
                <div className='header__list'>
                    <a className='header__li'>Калькулятор</a>
                    <a className='header__li'>Cтоимости ремонта</a>
                </div>
            </div>
       </div>}
        </>
  
       
    )
}

export default Header
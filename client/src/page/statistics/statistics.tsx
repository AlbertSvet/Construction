import './statistics.scss'
import { Link } from 'react-router-dom'
import Diagram from '../../component/diagram/diagram'

const Statistics = () =>{
    return(
        <section className='statistics'>
            <div className='statistics__container _container'>
                <div className='statistics__main-block'>
                    <h1 className='statistics__title'>Общая статистика по стоимости просчета:</h1>
                    <div className='statistics__diagram-block'>
                        <Diagram/>
                    </div>
                    <div className='statistics__footer'>
                        <ul className='statistics__notes'>
                            <li className='statistics__li'>Примечания:</li>
                            <li className='statistics__li-list'>Учитываются все сохраненные просчеты. Ненужные можно удалить на главной странице</li>
                        </ul>
                        <Link className='statistics__back' to={'/main-calculator'}>Назад</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Statistics
import './square.scss';

const Square = () =>{
    return (
         <div className='mainCalculator__square square'>
            <div className='square__body'>
                <div className='square__height-block'>
                    <p className='square__height-text'>Высота потолка в квартире:</p>
                    <input type="number" name='height' placeholder='0.0'/>
                    <span>M</span>
                </div>
                <h2 className='square__rooms'>Площадь отдельных комнат:</h2>

                <form action="#">

                </form>

                <div className='square__notes-block'>
                    <p className='square__note'>Примечания:</p>
                    <ul className='square__list'>
                        <li className='square__li'>устанавливайте площадь помещений там, где необходим ремонт</li>
                        <li className='square__li'>если есть дополнительные комнаты, например, Спальня №3, то добавляйте их площадь к существующим в калькуляторе</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Square
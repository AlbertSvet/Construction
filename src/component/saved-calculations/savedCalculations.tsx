import './savedCalculations.scss';
import { storePdf } from '../../store/store';
const SavedCalculations = () =>{
    const calculationsPdf = storePdf((store)=> store.calculationsPdf)
    console.log(calculationsPdf)
    return(
        <div className='saved-calculations__container _container'>
            <h2 className='saved-calculations__title'>Сохраненные расчеты:</h2>
            <div className='saved-calculations__grid'>
                {calculationsPdf.length === 0 && <p>Список пуст</p>}
                {calculationsPdf.map(item =>{
                   
                    return (
                        <div>{item.fileName}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default SavedCalculations
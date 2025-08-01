import './savedCalculations.scss';
import { storePdf } from '../../store/store';
import { useEffect } from 'react';
import pdfIcon from './pdf_icon.svg'
const SavedCalculations = () =>{
    // метод отображения списка файлов из бд 
        const getPdf = storePdf((state)=> state.getPdf);
        const calculationsListPDF = storePdf((state)=> state.calculationsListPDF)
        
     useEffect(()=>{
        getPdf({url: 'http://localhost:3002/files'})
    },[])
    
    return(
        <div className='saved-calculations__container _container'>
            <div className='saved-calculations__block'>
                <h2 className='saved-calculations__title'>Сохраненные расчеты:</h2>
                <ul className='saved-calculations__grid'>
                    {calculationsListPDF.length === 0 && <p>Список пуст</p>}
                    {calculationsListPDF.map((item,i) =>{
                    const {fileName} = item
                        return (
                            <li key={i} className='saved-calculations__item'><img src= {pdfIcon} alt="icon_pdf" />{fileName} <button type="button">X</button></li>
                        )
                    })}
                </ul>
            </div>
           
        </div>
    )
}

export default SavedCalculations
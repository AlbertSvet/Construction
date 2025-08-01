import './btnPdf.scss'
import { necessaryWork,squareStore, calculation,storePdf,useStoreAut } from '../../store/store'
import { useEffect } from 'react'
import { stat } from 'fs'

const BtnPdf = () =>{
    // получаем user 
    const user = useStoreAut((state)=> state.user)
    //  метод отправки данных на серв
    const postPdf = storePdf((state)=> state.postPdf)
    // метод гет запроса на монгоДБ для ререндера компонента
    const getPdf = storePdf((state)=> state.getPdf)
    //  выбранные работы
    const chekidWork = necessaryWork((state)=> state.work);
    //  выбранные комнат 
    const squareData = squareStore((state)=> state.squareData)
    //  высота потолка
    const ceilingHeight = squareStore((state)=> state.ceilingHeight)
    //  итоговая сумма в рублях 
    const totalPriceRub = calculation((state)=>state.totalPrice)
    //  итоговая сумма в usd
    const totalUsdPrice = calculation((state) => state.totalUsdPrice)

    const gWorks = async () =>{
        const chekidWorkFilter = chekidWork.filter(item => item.checked)
        const squareDataFilter = squareData.filter(item =>item.value !==0)
        const wallJobs = [
        "Штукатурка стен",
        "Шпаклевка стен",
        "Поклейка обоев",
        "Покраска стен"
        ];

        // проверяем отмеченные работы из списка
        const requiredWork = chekidWorkFilter.some(item=> wallJobs.includes(item.name))

        if (chekidWorkFilter.length === 0 || squareDataFilter.length === 0){
            console.log('Заполните поля')
            return 
        }
        // если выбраны работы из списка и высота потолка и не null
        if(requiredWork && (!ceilingHeight ||ceilingHeight === 0)) {
            console.log('укажите высоту потолка')
            return
        }
        const report = {
            chekidWork: chekidWorkFilter,
            squareData: squareDataFilter,
            ceilingHeight: ceilingHeight,
            totalPriceRub: totalPriceRub,
            totalUsdPrice: totalUsdPrice,
            userEmail: user?.email
        }
       
        const response = await postPdf({url:'http://localhost:3002/generate-pdf',method: "POST", body: JSON.stringify(report),responseType:'blob'})
        // const responseBlob  = await response.blob()

         const url = window.URL.createObjectURL(response);
         const a = document.createElement('a');
            a.href = url;
            a.download = `Отчет ${new Date().toLocaleDateString()}.pdf`;
            document.body.appendChild(a);
            a.click(); // симулируем клик
            a.remove(); // удаляем ссылку
            window.URL.revokeObjectURL(url); 
         getPdf({url: 'http://localhost:3002/files'});
    }

   
   
    return(
        <div className="mainCalculator__btn-block">
            <button onClick={gWorks} className="mainCalculator__btn-save">Скачать PDF</button>
        </div>
    )
}

export default BtnPdf
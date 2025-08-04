import './diagram.scss';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { storePdf } from '../../store/store';
import { useEffect, useMemo } from 'react';
import { FilePdfMeta } from '../../store/get-pdf/getPdf';
// Регистрируем модули для Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Diagram = () =>{
    const getPdf = storePdf((state)=> state.getPdf);
    const calculationsListPDF = storePdf((state)=> state.calculationsListPDF);
    
    const rangeCalculation = (dataList:FilePdfMeta[]) =>{
        const range = {  
            upTo1000: 0,
            priceBetween1000And2500: 0,
            priceAbove2500: 0
        }
        dataList.forEach(item => {
            if(+item.totalUsdPrice <= 999){
                range.upTo1000++
            }else if (+item.totalUsdPrice >= 1000 && +item.totalUsdPrice <= 2500){
                range.priceBetween1000And2500++
            }else if (+item.totalUsdPrice >=2500) {
                range.priceAbove2500++
            }
        })
        return range
    }
    const rangeCount = useMemo(() => rangeCalculation(calculationsListPDF), [calculationsListPDF]);

    useEffect(()=>{
        getPdf({url: 'http://localhost:3002/files'})
    },[])

   
    const data = {
    labels: ['от 1000$ до 2500$', 'до 1000$', 'от 2500$'],
    datasets: [
      {
        // label: 'Голосов',
        cutout: "50%",
        data: [rangeCount.priceBetween1000And2500, rangeCount.upTo1000, rangeCount.priceAbove2500],
        backgroundColor: [ 'rgb(255, 95, 19)', '#312f2fff', 'rgba(255, 196, 0, 1), 95, 19)'],
        borderColor: ['#fff', '#fff', '#fff'],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data}/>
}

export default Diagram
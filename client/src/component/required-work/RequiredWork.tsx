import './required-work.scss';

import { necessaryWork, calculation, squareStore } from '../../store/store';
import { ChangeEvent, useEffect } from 'react';
const RequiredWork = () =>{
    const getNecessaryWork = necessaryWork((state) => state.getNecessaryWork);
    const storeWork = necessaryWork((state) => state.work);
    const updateWork = necessaryWork((state)=> state.updateWork)
    const status = necessaryWork((state)=> state.status)

   
     //  валидация высоты потолка( указали ли пользователь высоту)
        const ceilingHeight = squareStore((state)=> state.ceilingHeight)
        const wallJobs = [
            "Штукатурка стен",
            "Шпаклевка стен",
            "Поклейка обоев",
            "Покраска стен"
        ];

    
        const wallWorkSelected = storeWork.some((item)=>{
            if(item.checked && wallJobs.includes(item.name)){
                return true
            }else{
                return false
            }
        })
        const shouldShowCeilingWarning = wallWorkSelected && ceilingHeight <= 0 ? true : false
    // ==================
    useEffect(()=>{
        if(!status){
            getNecessaryWork({url: 'http://localhost:3002/operations'})
        }
    },[])
    const getValue = (e: ChangeEvent<HTMLInputElement>) =>{
        const {checked , name, id} = e.target;
        const data = {
            name: name,
            id: id,
            checked: checked 
        }
        updateWork(data)
    }

    return (
       <section className='mainCalculator__requiredWork requiredWork'>
            <h1 className='requiredWork__title'>Название необходимых работ:</h1>
            <div className='requiredWork__body'>
                <form action="#">
                    {shouldShowCeilingWarning && <p className='requiredWork__shouldShowCeilingWarning'>Укажите высоту потолка</p>}
                    <div className='requiredWork__main-block'>
                        
                        {storeWork.map((item, i)=>{
                            const {name, count, unit, id, checked} = item
                            return (
                                <div className='requiredWork__item' key={i}>
                                    <p>{name} <span>{`${count} ${unit}`}</span></p>
                                    <input 
                                       
                                        onChange={getValue} 
                                        type='checkbox' 
                                        id={id} 
                                        name={id} 
                                        checked={checked || false} 
                                        />
                                    <label htmlFor={id}></label>                                     
                                </div>
                            )
                        })}
                    </div>
                </form>
            </div>
       </section>
    )
}

export default RequiredWork
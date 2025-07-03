import './required-work.scss';
import chex from './Check.svg'
import { necessaryWork } from '../../store/store';
import { ChangeEvent, useEffect } from 'react';
const RequiredWork = () =>{
    const getNecessaryWork = necessaryWork((state) => state.getNecessaryWork);
    const storeWork = necessaryWork((state) => state.work);
    const updateWork = necessaryWork((state)=> state.updateWork)
    const status = necessaryWork((state)=> state.status)

    useEffect(()=>{
        if(!status){
            getNecessaryWork({url: 'http://localhost:3001/operations'})
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
    console.log(storeWork)
    return (
       <section className='mainCalculator__requiredWork requiredWork'>
            <h1 className='requiredWork__title'>Название необходимых работ:</h1>
            <div className='requiredWork__body'>
                <form action="#">
                    <div className='requiredWork__main-block'>
                        {storeWork.map((item, i)=>{
                            const {name, count, unit, id, checked} = item
                            return (
                                <div className='requiredWork__item' key={i}>
                                    <p>{name} <span>{`${count} ${unit}`}</span></p>
                                    <input onChange={getValue} type='checkbox' id={id} name={id} checked={checked || false} />
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
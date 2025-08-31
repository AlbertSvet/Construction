import './square.scss';
import { squareStore } from '../../store/store';
import { ChangeEvent, useEffect, useRef, useState} from 'react';



const Square = () =>{

const ceilingHeight = squareStore((state)=> state.ceilingHeight)
const getCeilingHeight = squareStore((state)=> state.getCeilingHeight)



const getDataCeilingHeight = (e:ChangeEvent<HTMLInputElement>) =>{
    const {name, value, id} = e.target;
    const parsI = Number.parseInt(value, 10);
    const vall = isNaN(parsI) ? 0 : parsI;
    getCeilingHeight(vall)
}   
    return (
         <div className='mainCalculator__square square'>
            <div className='square__body'>
                <div className='square__height-block'>
                    <p className='square__height-text'>Высота потолка в квартире:</p>
                    <input 
                     type="number" 
                     placeholder='0.0' 
                     value={ceilingHeight === 0 ?  '' : ceilingHeight}
                     onChange={(e) => getDataCeilingHeight(e)}/>
                    <span>M</span>
                </div>
                <h2 className='square__rooms'>Площадь отдельных комнат:</h2>

                <form action="#">
                    <div className='square__main-block'>
                      <View />
                    </div>
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
interface squareParams {
    name: string,
    value: number,
    id: string
}
const View = () =>{
    const squareData = squareStore((state)=>state.squareData);
    const getSquareData = squareStore((state) => state.getSquareData);
    const updateSquareData = squareStore((state) => state.updateSquareData);
    const status = squareStore((state)=>state.status)

    const [activeId, setActiveId] = useState<string | null>(null)
    
    useEffect(()=>{
        if(!status){
            getSquareData({url:'http://localhost:3002/squares'})

        }
    },[])

    const getValue = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value, id} = e.target;
        const parsI = Number.parseInt(value,10)
        const data = {
            name:name,
            value: isNaN(parsI) ? 0 : parsI,
            id: id
        }
       updateSquareData(data)
      
    }
    
       
        
        return (
            
            <>
                
                {squareData.map(({name,id, value},i)=> {
                    const isActive = activeId === id || value > 0;
                    const isActiveFalse =  value < 0 ? ' active-false' : '';
                    const activeInputClass = `square__input${isActive && value >= 0 ? '  active-inp' : isActiveFalse}`;
                    return (
                        
                        <div className='square__item' key={i}>
                            <label htmlFor={id}>{name}</label>
                            <input 
                            onFocus={()=>setActiveId(id)}
                            onBlur={()=>setActiveId(null)}
                            onChange={(e)=>getValue(e)} 
                            type="number" 
                            placeholder='0.0' 
                            name={name} 
                            value={value === 0 ? '' : value}
                            id={id}
                            className={activeInputClass}/>
                            <span>М<sup>2</sup></span>
                        </div>
                        )            
                })}
            </>
             
            
        )
   



}
export default Square
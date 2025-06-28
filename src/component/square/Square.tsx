import './square.scss';
import { squareStore } from '../../store/store';
import { ChangeEvent, useEffect } from 'react';
import { Value } from 'sass';


const Square = () =>{

const squareData = squareStore((state)=>state.squareData);
const getSquareData = squareStore((state) => state.getSquareData);
// console.log(squareData) почему выводить Object object  
// console.log(squareData)
const ceilingHeight = squareStore((state)=> state.ceilingHeight)
const getCeilingHeight = squareStore((state)=> state.getCeilingHeight)



const {name, id, value} = ceilingHeight
useEffect(()=>{
    getSquareData({url:'http://localhost:3001/squares'})
},[])

const getDataCeilingHeight = (e:ChangeEvent<HTMLInputElement>) =>{
    const {name, value, id} = e.target;
    const parsI = Number.parseInt(value, 10);
    getCeilingHeight({
        name: name,
        value: isNaN(parsI) ? 0 : parsI,
        id: id
    })
}   
    return (
         <div className='mainCalculator__square square'>
            <div className='square__body'>
                <div className='square__height-block'>
                    <p className='square__height-text'>Высота потолка в квартире:</p>
                    <input 
                     type="number" 
                     name={name} 
                     placeholder='0.0' 
                     id={id} 
                     value={value === 0 ? '' : value}
                     onChange={(e) => getDataCeilingHeight(e)}/>
                    <span>M</span>
                </div>
                <h2 className='square__rooms'>Площадь отдельных комнат:</h2>

                <form action="#">
                    <div className='square__main-block'>
                      <View squareData={squareData}/>
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
const View = ({squareData}:{squareData:squareParams[]}) =>{
   
    const updateSquareData = squareStore((state) => state.updateSquareData);

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
                    return (
                        
                        <div className='square__item' key={i}>
                            <label htmlFor={id}>{name}</label>
                            <input 
                            onChange={(e)=>getValue(e)} 
                            type="number" 
                            placeholder='0.0' 
                            name={name} 
                            value={value === 0 ? '' : value}
                            id={id}/>
                            <span>М<sup>2</sup></span>
                        </div>
                        )            
                })}
            </>
             
            
        )
   



}
export default Square
import RequiredWork from "../../component/required-work/RequiredWork"
import Square from "../../component/square/Square"
import TotalCost from "../../component/totalcost/TotalCost"
import { useOut, useTabs } from "../../store/store"
import { useStoreAut } from "../../store/store"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import './mainCalculator.scss';

const MainCalculator = () =>{
    const singOut = useOut((state)=>state.zusOut);
    const activeTab = useTabs((state)=> state.tabIndex)
    const changeActive = useTabs((state)=>state.changeActive)
    const user = useStoreAut((state)=>state.user)
    const loading = useStoreAut((state)=>state.loading)
   
    const navigate = useNavigate();

    useEffect(()=>{
        if(!loading && !user){
            navigate('/authorization')
        }
    },[loading, user])

    

    const handleOut = async () =>{
        await singOut()
        navigate('/authorization', {replace:true})
    }
    let classNames = 'mainCalculator__btn'

    return(
        <section className="mainCalculator">
            <div className="mainCalculator__container _container">
                <div className='mainCalculator__info'>                    
                    <p className='mainCalculator__user'>Вы вошли как {user?.email as string}</p>
                    <button className='mainCalculator__btn-exit' onClick={handleOut}>Выйти</button>
                </div>

                
                    <div className="mainCalculator__tabs">
                        <button onClick={()=>changeActive(0)} type="button" className= {`${classNames} ${activeTab === 0 ? 'active': ''}`} >Площадь помещения</button>
                        <button onClick={()=>changeActive(1)} type="button" className={`${classNames} ${activeTab === 1 ? 'active': ''}`}>Необходимые работы</button>
                    </div>
                    <div className="mainCalculator__grid">
                        <div className="mainCalculator__main-block">
                            {activeTab === 0 &&  <Square/>}
                            {activeTab === 1 &&  <RequiredWork/>}
                        </div>
                        <div>
                            <TotalCost/>

                        </div>
                    </div>
                   
                
            </div>
            
            
        </section >
    )
}

export default MainCalculator
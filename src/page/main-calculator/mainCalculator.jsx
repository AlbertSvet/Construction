import { auth } from "../../firebase/firebaseConfig"
import { useOut } from "../../store/store"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
const MainCalculator = () =>{
    const singOut = useOut((state)=>state.zusOut)
    const user = auth.currentUser
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/authorization')
        }
    },[user])
    const handleOut = async () =>{
        await singOut()
        navigate('/authorization')
    }
    return(
        <div>
            Главная страница
            <button onClick={handleOut}>Выйти</button>
        </div>
    )
}

export default MainCalculator
import React, { useEffect } from 'react';
import Header from '../header/Header';
import { auth } from '../../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useStoreAut } from '../../store/store';
import Registration from '../../page/registration/registration';
import Authorization from '../../page/authorization/authorization';
import MainCalculator from '../../page/main-calculator/mainCalculator';
import Statistics from '../../page/statistics/statistics';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import bg from './Background.jpg'
import './App.scss';

function App() {
  const user = useStoreAut((state)=>state.user);
  const setUser = useStoreAut((state)=>state.setUser);
  const clearUser = useStoreAut((state)=>state.clearUser);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged (auth,(user)=>{
      if(user){
        setUser(user);
      }else{
         clearUser();
      }
    })
    return () => unsubscribe();
  },[])
  
  return (
    <Router>
      <div className="wrapper" style={{'--fon': `url(${bg})`} as React.CSSProperties}>
          <Header/>

          <main className='page'>
            <Routes>
              <Route path='/' element={<Registration/>}/>
              <Route path='/authorization' element={<Authorization/>}/>
              <Route path='/main-calculator' element={<MainCalculator/>}/>
              <Route path='/statistics' element={<Statistics/>}/>
            </Routes>
          </main>

          <div className='footer _container'>FOOTER</div>
      </div>
    </Router>
  );
}

export default App;

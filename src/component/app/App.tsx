import React from 'react';
import Header from '../header/Header';
import Registration from '../../page/registration/registration';
import Authorization from '../../page/authorization/authorization';
import MainCalculator from '../../page/main-calculator/mainCalculator';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import bg from './Background.jpg'
import './App.scss';

function App() {
  return (
    <Router>
      <div className="wrapper" style={{'--fon': `url(${bg})`} as React.CSSProperties}>
          <Header/>

          <main className='page'>
            <Routes>
              <Route path='/' element={<Registration/>}/>
              <Route path='/authorization' element={<Authorization/>}/>
              <Route path='/main-calculator' element={<MainCalculator/>}/>
            </Routes>
          </main>

          <div className='footer _container'>FOOTER</div>
      </div>
    </Router>
  );
}

export default App;

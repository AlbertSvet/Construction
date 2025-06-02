import React from 'react';
import Header from '../header/Header';
import Registration from '../../page/registration/registration';
import Authorization from '../../page/authorization/authorization';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import bg from './Background.png'
import './App.scss';

function App() {
  return (
    <Router>
      <div className="wrapper" style={{'--fon-bg': `url(${bg})`} as React.CSSProperties}>
          <Header/>

          <main className='page'>
            <Routes>
              <Route path='/' element={<Registration/>}/>
              <Route path='/authorization' element={<Authorization/>}/>
            </Routes>
          </main>

          <div className='footer _container'>FOOTER</div>
      </div>
    </Router>
  );
}

export default App;

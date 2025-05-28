import React from 'react';
import Header from '../header/Header';
import Registration from '../../page/registration/registration';
import './App.scss';

function App() {
  return (
    <div className="wrapper">
        <Header/>

        <main className='page'>
            <Registration/>
        </main>

        <div className='footer _container'>FOOTER</div>
    </div>
  );
}

export default App;

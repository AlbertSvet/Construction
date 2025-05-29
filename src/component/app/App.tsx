import React from 'react';
import Header from '../header/Header';
import Registration from '../../page/registration/registration';
import bg from './Background.png'
import './App.scss';

function App() {
  return (
    <div className="wrapper" style={{'--fon-bg': `url(${bg})`} as React.CSSProperties}>
        <Header/>

        <main className='page'>
            <Registration/>
        </main>

        <div className='footer _container'>FOOTER</div>
    </div>
  );
}

export default App;

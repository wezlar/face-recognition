import React from 'react';
import './App.css';

import Camera from './components/camera/Camera';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Test app
        </p>
        <Camera />
      </header>
    </div>
  );
}

export default App;

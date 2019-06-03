import React from 'react';
import './App.css';

import FaceRecognition from './components/faceRecognition/FaceRecognition';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Test app
        </p>
        <FaceRecognition />
      </header>
    </div>
  );
}

export default App;

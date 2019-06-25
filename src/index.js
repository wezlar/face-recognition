import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import Camera from '../src/components/Camera/Camera';
import ImageInput from '../src/components/ImageInput/ImageInput';

import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <div>
    <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/camera'>Camera</Link>
        </li>
        <li>
          <Link to='/photo'>Photo</Link>
        </li>
      </ul>
      <Route exact={true} path='/' component={App} />
      <Route path='/camera' component={Camera} />
      <Route path='/photo' component={ImageInput} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

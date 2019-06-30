import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import Camera from '../src/components/Camera/Camera';
import VideoInput from '../src/components/VideoInput/VideoInput';
import ImageInput from '../src/components/ImageInput/ImageInput';
import Navigation from '../src/components/Navigation/Navigation';

import * as serviceWorker from './serviceWorker';

const links = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Camera',
    url: '/camera',
  },
  {
    label: 'Video Input',
    url: '/video',
  },
  {
    label: 'Image',
    url: '/image',
  },
];

const routing = (
  <Router>
    <div>
      <Navigation links={links} />
      <Route exact={true} path='/' component={App} />
      <Route path='/video' component={VideoInput} />
      <Route path='/image' component={ImageInput} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

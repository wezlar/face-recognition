import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import VideoInput from '../src/components/VideoInput/VideoInput';
import ImageInput from '../src/components/ImageInput/ImageInput';
import Navigation from '../src/components/Navigation/Navigation';

const links = [
  {
    label: 'Home',
    url: '/',
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

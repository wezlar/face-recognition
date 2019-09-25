import React, { Component } from 'react';
import {
  cleanup,
} from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from './App';
jest.mock('./components/VideoInput/VideoInput', () => 'VideoInput');
jest.mock('./components/ImageInput/ImageInput', () => 'ImageInput');
jest.mock('./components/Navigation/Navigation', () => 'VideoInput');

jest.mock('react-dom', () => ({ render: jest.fn() }));
afterEach(cleanup);

describe('Application root', () => {
  test('should render without crashing', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    require('./index.js');
    expect(ReactDOM.render).toHaveBeenCalled();
    expect(ReactDOM.render).toMatchSnapshot();
  });
});

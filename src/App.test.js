import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';

import App from './App';

afterEach(cleanup);

describe('App.js', () => {
  test('to be replaced', () => {
    const { container } = render(<App />);

    expect(container.firstChild).toMatchSnapshot();
  });
});



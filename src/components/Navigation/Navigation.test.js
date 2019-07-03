// __tests__/fetch.js
import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
// this adds custom jest matchers from jest-dom
import renderWithRouter from '../../testUtils/renderWithRouter';
import Navigation from './Navigation';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

const mockLinks = [
  {
    label: 'Home Page',
    url: '/',
  },
  {
    label: 'Test Page 1',
    url: '/test-page-1',
  },
  {
    label: 'Test Page 2',
    url: '/test-page-2',
  },
];

describe(`Test Navigation`, () => {
  test(`Test snapshot`, () => {
    // Arrange
    const { container, debug } = renderWithRouter(
      <Navigation links={mockLinks} />,
    );

    // snapshots work great with regular DOM nodes!
    expect(container.firstChild).toMatchSnapshot();
  });
});
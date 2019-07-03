// __tests__/fetch.js
import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
// this adds custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import renderWithRouter from '../../testUtils/renderWithRouter';
import NavigationLink from './NavigationLink';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);
describe(`Test NavigationLink`, () => {
  test(`Test snapshot`, () => {
    // Arrange
    const { container, getByText } = renderWithRouter(
      <NavigationLink label='Test label' url={'/home'} />,
    );
  
    // snapshots work great with regular DOM nodes!
    expect(container.firstChild).toMatchSnapshot();
  });
});
// __tests__/fetch.js
import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
// this adds custom jest matchers from jest-dom
import DrawNameBox from './DrawNameBox';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);
describe(`Test DrawNameBox`, () => {
  test(`Test snapshot`, () => {
    const match = [
      {
        _label: 'Test Label 1',
      },
      {
        _label: 'Test Label 2',
      }
    ];
    
    // Arrange
    const { container, getByTestId, debug } = render(
      <DrawNameBox 
        match={match} 
        index={0}
        width={10}
        height={10} />
    );

    // snapshots work great with regular DOM nodes!
    expect(container.firstChild).toMatchSnapshot();
    expect(getByTestId('draw-name-box').textContent).toBe(match[0]._label);
    expect(getByTestId('draw-name-box').style.width).toBe('10px');
    expect(getByTestId('draw-name-box').style.transform).toBe('translate(-3px, 10px)');
  });
});
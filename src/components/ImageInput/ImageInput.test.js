// __tests__/fetch.js
import React from 'react';
import {
  render,
  cleanup,
  waitForElement,
} from '@testing-library/react';
// this adds custom jest matchers from jest-dom
import ImageInput from './ImageInput';
import { mockFindBestMatch } from '../../api/__mocks__/mockFunctions';

jest.mock('../../api/face');

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);
describe(`Test ImageInput`, () => {
  test(`Test snapshot`, async () => {
    // Arrange
    const { container, debug, getByTestId } = render(
      <ImageInput />,
    );

    // snapshots work great with regular DOM nodes!
    expect(container.firstChild).toMatchSnapshot();

    const testing = await waitForElement(() => getByTestId('draw-box'));
    expect(testing).toMatchSnapshot();
    expect(getByTestId('draw-name-box').textContent).toBe(mockFindBestMatch._label);
  });
});
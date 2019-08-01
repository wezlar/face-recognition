import React from 'react';
import {
  render,
  cleanup,
  waitForElement,
} from '@testing-library/react';

import ImageInput from './ImageInput';
import { mockFindBestMatch } from '../../api/__mocks__/mockFunctions';

jest.mock('../../api/face');

afterEach(cleanup);
describe(`Test ImageInput`, () => {
  test(`Test snapshot`, async () => {
    const { container, debug, getByTestId } = render(
      <ImageInput />,
    );

    expect(container.firstChild).toMatchSnapshot();

    const testing = await waitForElement(() => getByTestId('draw-box'));
    expect(testing).toMatchSnapshot();
    expect(getByTestId('draw-name-box').textContent).toBe(mockFindBestMatch._label);
  });
});
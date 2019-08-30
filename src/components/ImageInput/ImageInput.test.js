import React from 'react';
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
} from '@testing-library/react';
import { loadModels, getFullFaceDescription, createMatcher } from '../../api/face';

import ImageInput from './ImageInput';
import { mockFindBestMatch } from '../../api/__mocks__/mockFunctions';

jest.mock('../../api/face');
const originalWindow = global.Window;
global.URL = Object.create(URL);
URL = Object.defineProperty(URL, 'createObjectURL', {
  value: jest.fn()
})

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
  
  test(`Test file upload works`, async () => {
    const { container, getByTestId } = render(
      <ImageInput />,
    );

    let input = await waitForElement(() => getByTestId('file-upload'));
    const mockImage = new File(['(⌐□_□)'], '../../img/rio.jpg', { type: 'image/jpeg', lastModified: new Date });

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.change(input, {
      target: {
        files: [
          mockImage
        ]
      }
    })

    expect(container.firstChild).toMatchSnapshot();
    expect(getFullFaceDescription).toHaveBeenCalledTimes(1)
    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1)
  })

  test(`Test file upload returns no match`, async () => {
    getFullFaceDescription.mockResolvedValue();

    const { getByTestId } = render(
      <ImageInput />,
    );

    const input = await waitForElement(() => getByTestId('file-upload'));
    expect(getFullFaceDescription).toHaveBeenCalledTimes(1);
  });
});

global.window = originalWindow;

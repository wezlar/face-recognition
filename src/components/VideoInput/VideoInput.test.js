import React from 'react';
import {
  render,
  cleanup,
  waitForElement,
} from '@testing-library/react';

import VideoInput from './VideoInput';
import { loadModels, getFullFaceDescription, createMatcher } from '../../api/face';
import { mediaDevices, multipleCameras } from '../../../testUtils/mediaDevices';

const originalWindow = global.Window;
global.window = Object.create(window);

jest.mock('../../api/face');
beforeEach(() => {
  Object.defineProperty(window, 'navigator', {
    value: {
      mediaDevices,
    },
  });
});

afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
  global.window = originalWindow;
  cleanup();
});

describe('Test VideoInput', () => {
  test('Test VideoInput Basics', async () => {
    const { container, getByTestId } = render(<VideoInput />);
    expect(container.firstChild).toMatchSnapshot();
    
    const webcam = await waitForElement(() => getByTestId('webcam'));
    expect(webcam).toMatchSnapshot();
    const drawbox = await waitForElement(() => getByTestId('draw-box'));
    expect(drawbox).toMatchSnapshot();

    expect(window.navigator.mediaDevices.enumerateDevices).toHaveBeenCalledTimes(1);
    expect(loadModels).toHaveBeenCalledTimes(1);
    expect(getFullFaceDescription).toHaveBeenCalledTimes(1);
    expect(createMatcher).toHaveBeenCalledTimes(1);
  });

  test('The setInterval should fire', async () => {
    jest.useFakeTimers();
    
    const { container, getByTestId } = render(<VideoInput />);
    expect(container.firstChild).toMatchSnapshot();
    
    const webcam = await waitForElement(() => getByTestId('webcam'));
    jest.advanceTimersByTime(2000);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(loadModels).toHaveBeenCalledTimes(1);
    expect(getFullFaceDescription).toHaveBeenCalledTimes(2);
    expect(createMatcher).toHaveBeenCalledTimes(1);
    expect(webcam).toMatchSnapshot();
  });

  test('Stops interval on unmount', async () => {
    jest.useFakeTimers();
    
    const { unmount } = render(<VideoInput />);
    unmount();
    jest.runOnlyPendingTimers();
    expect(setInterval).toHaveBeenCalledTimes(0);
    expect(loadModels).toHaveBeenCalledTimes(1);
    expect(getFullFaceDescription).toHaveBeenCalledTimes(0);
    expect(createMatcher).toHaveBeenCalledTimes(1);
  });

  test('Test difference multiple cameras', async () => {
    window.navigator.mediaDevices = multipleCameras;

    const { getByTestId } = render(<VideoInput />);
    const webcam = await waitForElement(() => getByTestId('webcam'));
    expect(window.navigator.mediaDevices.enumerateDevices).toHaveBeenCalledTimes(1);
    expect(loadModels).toHaveBeenCalledTimes(1);
    expect(getFullFaceDescription).toHaveBeenCalledTimes(1);
    expect(createMatcher).toHaveBeenCalledTimes(1);
  });

  test('Without any webcams', async () => {
    window.navigator.mediaDevices.enumerateDevices = jest.fn().mockResolvedValue([]);

    const { container } = render(<VideoInput />);
    expect(container.firstChild).toMatchSnapshot();
    expect(getFullFaceDescription).toHaveBeenCalledTimes(0);
  });

  test('Test getFullFaceDescription when returns empty fullDesc', async () => {
    window.navigator.mediaDevices = mediaDevices;
    getFullFaceDescription.mockResolvedValue();
    const { getByTestId } = render(<VideoInput />);

    await waitForElement(() => getByTestId('webcam'));
    expect(getFullFaceDescription).toHaveBeenCalledTimes(1);
  });
});

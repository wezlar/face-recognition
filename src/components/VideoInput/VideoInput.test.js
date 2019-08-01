import React, { Component } from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';

import VideoInput from './VideoInput';
import { JSON_PROFILE, INIT_STATE, VIDEO_SIZE } from '../../constants';

const originalWindow = global.Window;
global.window = Object.create(window);
const mediaDevices = {
  enumerateDevices: jest.fn().mockResolvedValue([
    {
      deviceId: 'default',
      groupId: '93f7124db4f938763012fa70d923a5832e6304d0bb0508c8a9283b6fb3e901fa',
      kind: 'audioinput',
      label: '',
    },
    {
      deviceId: '890c048ff7ee9c63ef25e6fe6439c435b029d7e6d9b61e0c4046dffe40993eb4',
      groupId: '93f7124db4f938763012fa70d923a5832e6304d0bb0508c8a9283b6fb3e901fa',
      kind: 'audioinput',
      label: '',
    },
    {
      deviceId: 'a4d796b64c620eb6ac4c6fea8eb68d2a1edf765f9dcfa21a53f963e6ed5332d8',
      groupId: '23aa31907dfcec8059ab203aa6c0dbea57a5420f1c42fa94efdc5021041ee763',
      kind: 'videoinput',
      label: 'FaceTime HD, Camera'
    },
    {
      deviceId: 'default',
      groupId: '93f7124db4f938763012fa70d923a5832e6304d0bb0508c8a9283b6fb3e901fa',
      kind: 'audiooutput',
      label: '',
    },
    {
      deviceId: '827cb2afab96ab5b170edb703fa8acb30da5b14b39f2f302ec5f5b7b562bd74e',
      groupId: '93f7124db4f938763012fa70d923a5832e6304d0bb0508c8a9283b6fb3e901fa',
      kind: 'audiooutput',
      label: '',
    },
  ])
}
Object.defineProperty(window, 'navigator', {
  value: {
    mediaDevices
  }
});

jest.mock('../../api/face');
jest.mock('react-webcam');

afterEach(cleanup);

describe.only(`Test VideoInput`, () => {
  const { container, debug } = render(<VideoInput />);
  // debug(container.firstChild)
  test(`Another test`, () => {
    
  });
});

global.window = originalWindow;

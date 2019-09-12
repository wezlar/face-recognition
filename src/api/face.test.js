import {
  render,
  cleanup,
  waitForElement,
} from '@testing-library/react';

import * as faceapi from 'face-api.js';
import { loadModels, getFullFaceDescription, createMatcher } from './face';
// import mockScreenShot from './__mocks__/mockScreenShot'

jest.mock('face-api.js', () => {
  return {
    loadTinyFaceDetectorModel: jest.fn(url => url),
    loadFaceLandmarkTinyModel: jest.fn(url => url),
    loadFaceRecognitionModel: jest.fn(url => url),
    TinyFaceDetectorOptions: jest.fn(({ inputSize, scoreThreshold }) => 'TinyFaceDetectorOptions'),
    fetchImage: jest.fn(blob => blob),
    detectAllFaces: jest.fn((img, option) => {
      return {
        withFaceLandmarks: jest.fn(img => {
          return {
            withFaceDescriptors: jest.fn(img => img).mockResolvedValue('fullDescImage')
          }
        }),
      }
    }),
  }
});

afterEach(() => {
  jest.restoreAllMocks();
  cleanup()
});

describe(`Test face api`, () => {
  test(`Check loadModels calls everything`, async () => {
    await loadModels();
    expect(faceapi.loadTinyFaceDetectorModel).toHaveBeenCalledTimes(1);
    expect(faceapi.loadFaceLandmarkTinyModel).toHaveBeenCalledTimes(1);
    expect(faceapi.loadFaceRecognitionModel).toHaveBeenCalledTimes(1);
  });

  test(`Test getFullFaceDescription returns expected`, async () => {
    const inputSize = 160;
    const fullDesc = await getFullFaceDescription(btoa('mockScreenShot'), inputSize);
    expect(fullDesc).toEqual('fullDescImage');
    expect(faceapi.fetchImage).toHaveBeenCalledTimes(1);
    expect(faceapi.detectAllFaces).toHaveBeenCalledTimes(1);
  })

  test(`Test createMatcher calls and returns expected`, () => {

  });
});

import {
  render,
  cleanup,
  waitForElement,
} from '@testing-library/react';

import * as faceapi from 'face-api.js';
import { loadModels, getFullFaceDescription, createMatcher } from './face';
import { JSON_PROFILE } from '../constants';

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
            withFaceDescriptors: jest.fn(img => img).mockResolvedValue('fullDescImage'),
          };
        }),
      };
    }),
    LabeledFaceDescriptors: jest.fn((name, descriptors) => {
      return {
        descriptors,
        label: name,
        _descriptors: descriptors,
        _label: name,
      };
    }),
    FaceMatcher: jest.fn((descriptors, distance) => {
      return {
        distanceThreshold: distance,
        labeledDescriptors: descriptors,
        _distanceThreshold: distance,
        _labeledDescriptors: descriptors,
      };
    }),
  };
});

afterEach(() => {
  jest.restoreAllMocks();
  cleanup();
});

describe('Test face api', () => {
  test('Check loadModels calls everything', async () => {
    await loadModels();
    expect(faceapi.loadTinyFaceDetectorModel).toHaveBeenCalledTimes(1);
    expect(faceapi.loadFaceLandmarkTinyModel).toHaveBeenCalledTimes(1);
    expect(faceapi.loadFaceRecognitionModel).toHaveBeenCalledTimes(1);
  });

  test('Test getFullFaceDescription returns expected', async () => {
    const inputSize = 160;
    const fullDesc = await getFullFaceDescription(btoa('mockScreenShot'), inputSize);
    expect(fullDesc).toEqual('fullDescImage');
    expect(faceapi.fetchImage).toHaveBeenCalledTimes(1);
    expect(faceapi.detectAllFaces).toHaveBeenCalledTimes(1);
  });

  test('Test getFullFaceDescription returns expected without input size', async () => {
    const fullDesc = await getFullFaceDescription(btoa('mockScreenShot'));
    expect(fullDesc).toEqual('fullDescImage');
    expect(faceapi.fetchImage).toHaveBeenCalledTimes(1);
    expect(faceapi.detectAllFaces).toHaveBeenCalledTimes(1);
  });

  test('Test createMatcher calls and returns expected', async () => {
    const matchedProfiles = await createMatcher(JSON_PROFILE);
    expect(matchedProfiles).toMatchSnapshot();
  });
});

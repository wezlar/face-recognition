import { mockFindBestMatch, mockGetFullFaceDescription } from './mockFunctions'; 

module.exports = {
  loadModels: jest.fn(),
  getFullFaceDescription: jest.fn().mockResolvedValue(mockGetFullFaceDescription),
  createMatcher: jest.fn().mockResolvedValue({
    findBestMatch: jest.fn().mockReturnValue(mockFindBestMatch)
  }),
};
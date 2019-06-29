// import face profile
export const JSON_PROFILE = require('./descriptors/bnk48.json');

// Import image to test API
const testImg = require('./img/rio.jpg');

// Initial State
export const INIT_STATE = {
  descriptors: null,
  detections: null,
  facingMode: null,
  fullDesc: null,
  imageURL: testImg,
  match: null,
};

/**
 *  Export default constants
 *
 */
export default {
  JSON_PROFILE,
  INIT_STATE,
};
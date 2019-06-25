import React, { Component } from 'react';
import { loadModels, getFullFaceDescription } from '../../api/face';

// Import image to test API
const testImg = require('../../img/rio.jpg');

// Initial State
const INIT_STATE = {
  imageURL: testImg,
  fullDesc: null,
};

class ImageInput extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INIT_STATE };
  }

  componentWillMount = async () => {
    await loadModels();
    await this.handleImage(this.state.imageURL);
  };

  handleImage = async (image = this.state.imageURL) => {
    await getFullFaceDescription(image).then(fullDesc => {
      if (!!fullDesc) {
        this.setState({
          fullDesc,
          detections: fullDesc.map(fd => fd.detection),
        });
      }
    });
  };

  handleFileChange = async event => {
    this.resetState();
    await this.setState({
      imageURL: URL.createObjectURL(event.target.files[0]),
      loading: true,
    });
    this.handleImage();
  }

  resetState = () => {
    this.setState({ ...INIT_STATE });
  };

  render() {
    const { imageURL, detections } = this.state;

    let drawBox = null;

    if (!!detections) {
      drawBox = detections.map((detection, i) => {
        let _H = detection.box.height;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y;

        return (
          <div key={i}>
            <div
              style={{
                position: 'absolute',
                border: 'solid',
                borderColor: 'blue',
                height: _H,
                width: _W,
                transform: `translate(${_X}px, ${_Y}px)`,
              }} />
          </div>
        );
      });
    }

    return (
      <div>
        <input
          id='myFileUpload'
          type='file'
          onChange={this.handleFileChange}
          accept='.jpg, .jpeg, .png' />
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute' }}>
            <img src={imageURL} alt='imageURL' />
          </div>
          {!!drawBox ? drawBox : null}
        </div>
      </div>
    );
  }
}

export default ImageInput;
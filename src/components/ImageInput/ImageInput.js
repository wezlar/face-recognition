import React, { Component } from 'react';
import { loadModels, getFullFaceDescription, createMatcher } from '../../api/face';

// Import image to test API
const testImg = require('../../img/rio.jpg');

// import face profile
const JSON_PROFILE = require('../../descriptors/bnk48.json');

// Initial State
const INIT_STATE = {
  imageURL: testImg,
  fullDesc: null,
  detections: null,
  descriptors: null,
  match: null,
};

class ImageInput extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INIT_STATE, faceMatcher: null };
  }

  componentWillMount = async () => {
    await loadModels();
    this.setState({ faceMatcher: await createMatcher(JSON_PROFILE) });
    await this.handleImage(this.state.imageURL);
  };

  handleImage = async (image = this.state.imageURL) => {
    await getFullFaceDescription(image).then(fullDesc => {
      console.log({fullDesc});
      if (!!fullDesc) {
        this.setState({
          fullDesc,
          detections: fullDesc.map(fd => fd.detection),
          descriptors: fullDesc.map(fd => fd.descriptor),
        });
      }
    });
    
    if (!!this.state.descriptors && !!this.state.faceMatcher) {
      let match = await this.state.descriptors.map(descriptor =>
        this.state.faceMatcher.findBestMatch(descriptor)
      );
      this.setState({ match });
    }
  };

  handleFileChange = async event => {
    this.resetState();
    await this.setState({
      imageURL: URL.createObjectURL(event.target.files[0]),
      loading: true,
    });
    this.handleImage();
  };

  resetState = () => {
    this.setState({ ...INIT_STATE });
  };

  drawNameBox = ({i = 0, _W = 100, _H = 100}) => {
    const { match } = this.state;

    if (!match || !match[i]) {
      return null;
    };

    return (
      <p
        style={{
          backgroundColor: 'blue',
          border: 'solid',
          borderColor: 'blue',
          width: _W,
          marginTop: 0,
          color: '#fff',
          transform: `translate(-3px, ${_H}px)`,
        }}>
        {match[i]._label}
      </p>
    );
  }

  drawBox = () => {
    const { detections } = this.state;
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
              }}>
                {this.drawNameBox({i,_W, _H})}
              </div>
          </div>
        );
      });
    }

    return drawBox;
  };

  drawDescriptorsInput = () => {
    const { descriptors } = this.state;
    if (!descriptors) {
      return null;
    }

    return (<input
      id='myFileDescriptors'
      type='text'
      defaultValue={descriptors.join(', ')} />);
  };

  render() {
    const { imageURL, detections, descriptors } = this.state;

    return (
      <div>
        <input
          id='myFileUpload'
          type='file'
          onChange={this.handleFileChange}
          accept='.jpg, .jpeg, .png' />
        {this.drawDescriptorsInput(descriptors)}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute' }}>
            <img src={imageURL} alt='imageURL' />
          </div>
          {this.drawBox()}
        </div>
      </div>
    );
  }
}

export default ImageInput;
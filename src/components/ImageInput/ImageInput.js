import React, { Component } from 'react';
import { loadModels, getFullFaceDescription, createMatcher } from '../../api/face';
import DrawBox from '../DrawBox/DrawBox';

import { JSON_PROFILE, INIT_STATE } from '../../constants';

class ImageInput extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INIT_STATE };
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
    const { imageURL, detections, descriptors, match } = this.state;

    return (
      <div>
        <input
          id='myFileUpload'
          type='file'
          onChange={this.handleFileChange}
          accept='.jpg, .jpeg, .png' />
        {this.drawDescriptorsInput()}
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute' }}>
            <img src={imageURL} alt='imageURL' />
          </div>
          <DrawBox detections={detections} match={match} />
        </div>
      </div>
    );
  }
}

export default ImageInput;
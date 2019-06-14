import React, { Component } from 'react';
import { loadModels, getFullFaceDescription } from '../../api/face';

class Camera extends Component {
  constructor (props) {
    super(props);
  }

  componentWillMount = async () => {
    await loadModels();
    await this.handleImage(this.videoElement.src);
  }

  componentDidMount () {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, this.handleVideo.bind(this), this.videoError);
    }
  }

  handleVideo (stream) {
    // Update the state, triggering the component to re-render with the correct stream
    this.videoElement.srcObject = stream;
  }

  handleImage = async (image = '') => {
    await getFullFaceDescription(image).then(fullDesc => {
      console.log(fullDesc);
      this.setState({ fullDesc });
    });
  };

  videoError () {

  }

  render() {
    return (
      <div>
      <video 
        id='video' 
        width='640' 
        height='480' 
        className='cameraFrame' 
        autoPlay={true}
        ref={(input) => { 
          this.videoElement = input; 
        }} />
      </div>
    );
  }
}

export default Camera;
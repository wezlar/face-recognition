import React, { Component } from 'react';

class FaceRecognition extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, this.handleVideo.bind(this), this.videoError);
    }
  }

  handleVideo (stream) {
    // Update the state, triggering the component to re-render with the correct stream
    this.videoElement.srcObject = stream;
  } 

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

export default FaceRecognition;
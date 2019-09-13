import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { loadModels, getFullFaceDescription, createMatcher } from '../../api/face';
import DrawBox from '../DrawBox/DrawBox';

import { JSON_PROFILE, INIT_STATE, VIDEO_SIZE } from '../../constants';

const inputSize = 160;

class VideoInput extends Component {
  _isMounted = false;

  constructor (props) {
    super(props);
    this.webcam = React.createRef();
    this.state = { ...INIT_STATE };
  };

  componentWillMount = async () => {
    await loadModels();
    this.setInputDevice();
  };

  async componentDidMount () {
    this._isMounted = true;
    const matchedProfile = await createMatcher(JSON_PROFILE);
    if (this._isMounted) {
      this.setState({ faceMatcher: matchedProfile });
    }
  }

  componentWillUnmount () {
    clearInterval(this.interval);
    this._isMounted = false;
  };

  setInputDevice = () => {
    if (!this._isMounted) return;
    navigator.mediaDevices.enumerateDevices().then(async devices => {
      let inputDevice = await devices.filter(
        device => device.kind === 'videoinput'
      );
      
      if (!inputDevice.length) {
        await this.setState({
          facingMode: 'none',
        });
      } else if (inputDevice.length < 2) {
        if (this._isMounted) {
          await this.setState({
            facingMode: 'user',
          });
        }
      } else {
        if (this._isMounted) {
          await this.setState({
            facingMode: { exact: 'environment' },
          });
        }
      }
      this.startCapture();
    });
  };

  startCapture = () => {
    if (!!this.webcam.current) {
      this.capture();
      this.interval = setInterval(() => {
        this.capture();
      }, 1500);
    }
  };

  capture = async () => {
    if (!this.webcam.current) return;
    await getFullFaceDescription(
      this.webcam.current.getScreenshot(),
      inputSize
    ).then(fullDesc => {
      if (!!fullDesc) {
        this.setState({
          detections: fullDesc.map(fd => fd.detection),
          descriptors: fullDesc.map(fd => fd.descriptor),
        });
      }
    });

    if (!!this.state.descriptors && !!this.state.faceMatcher) {
      let match = await this.state.descriptors.map(descriptor => {
        return this.state.faceMatcher.findBestMatch(descriptor);
      });
      this.setState({ match });
    }
  };

  render () {
    const { detections, match, facingMode } = this.state;
    let videoConstraints = null;
    let camera = '';
    
    if (!!facingMode) {
      videoConstraints = {
        width: VIDEO_SIZE.WIDTH,
        height: VIDEO_SIZE.HEIGHT,
        facingMode,
      };
      if (facingMode === 'none') {
        camera = 'none';
      } else if (facingMode === 'user') {
        camera = 'Front';
      } else {
        camera = 'Back';
      }
    }

    return (
      <div
        className='camera'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }} >
        <p>Camera: {camera}</p>
        <div
          style={{
            width: VIDEO_SIZE.WIDTH,
            height: VIDEO_SIZE.HEIGHT,
          }} >
          <div style={{ position: 'relative', width: VIDEO_SIZE.WIDTH }}>
            {!!videoConstraints && camera !== 'none' ? (
              <div data-testid='webcam' style={{ position: 'absolute' }}>
                <Webcam
                  audio={false}
                  width={VIDEO_SIZE.WIDTH}
                  height={VIDEO_SIZE.HEIGHT}
                  ref={this.webcam}
                  screenshotFormat='image/jpeg'
                  videoConstraints={videoConstraints} />
              </div>
            ) : <div data-testid='webcam' style={{ position: 'absolute' }}>No camera</div> }
            <DrawBox key={1} detections={detections} match={match} />
          </div>
        </div>
      </div>
    );
  };
};

export default VideoInput;
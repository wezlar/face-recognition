import React, { Component } from 'react';
import Webcam from 'react-webcam';
import { loadModels, getFullFaceDescription, createMatcher } from '../../api/face';
import DrawBox from '../DrawBox/DrawBox';

import { JSON_PROFILE, INIT_STATE, VIDEO_SIZE } from '../../constants';

const inputSize = 160;

class VideoInput extends Component {
  constructor (props) {
    super(props);
    this.webcam = React.createRef();
    this.state = { ...INIT_STATE };
  };

  componentWillMount = async () => {
    await loadModels();
    this.setState({ faceMatcher: await createMatcher(JSON_PROFILE) });
    this.setInputDevice();
  };

  setInputDevice = () => {
    navigator.mediaDevices.enumerateDevices().then(async devices => {
      let inputDevice = await devices.filter(
        device => device.kind === 'videoinput'
      );
      
      if (inputDevice.length < 2) {
        await this.setState({
          facingMode: 'user',
        });
      } else {
        await this.setState({
          facingMode: { exact: 'environment' },
        });
      }
      this.startCapture();
    });
  };

  startCapture = () => {
    this.interval = setInterval(() => {
      this.capture();
    }, 1500);
  };

  componentWillUnmount () {
    clearInterval(this.interval);
  };

  capture = async () => {
    if (!!this.webcam.current) {
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
    }
  };

  render () {
    const { detections, match = {}, facingMode } = this.state;
    let videoConstraints = null;
    let camera = '';
    
    if (!!facingMode) {
      videoConstraints = {
        width: VIDEO_SIZE.WIDTH,
        height: VIDEO_SIZE.HEIGHT,
        facingMode,
      };
      if (facingMode === 'user') {
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
            {!!videoConstraints ? (
              <div style={{ position: 'absolute' }}>
                <Webcam
                  audio={false}
                  width={VIDEO_SIZE.WIDTH}
                  height={VIDEO_SIZE.HEIGHT}
                  ref={this.webcam}
                  screenshotFormat='image/jpeg'
                  videoConstraints={videoConstraints} />
              </div>
            ) : null}
            <DrawBox key={1} detections={detections} match={match} />
          </div>
        </div>
      </div>
    );
  };
};

export default VideoInput;
import React from 'react';
import PropTypes from 'prop-types';
import DrawNameBox from '../DrawNameBox/DrawNameBox';

const boxStyle = {
  position: 'absolute',
  border: 'solid',
  borderColor: 'blue',
};

const DrawBox = (props = {}) => {
  const { detections, match } = props;
  let drawBox = null;

  if (!!detections) {
    drawBox = detections.map((detection, i) => {
      let _H = detection.box.height;
      let _W = detection.box.width;
      let _X = detection.box._x;
      let _Y = detection.box._y;

      return (
        <div
          key={i}
          data-testid='draw-box'
          style={{
            ...boxStyle,
            height: _H,
            width: _W,
            transform: `translate(${_X}px, ${_Y}px)`,
          }}>
            <DrawNameBox 
              key={i}
              match={match} 
              index={i} 
              width={_W} 
              height={_H} />
        </div>
      );
    });
  }

  return drawBox;
};

DrawBox.propTypes = {
  detections: PropTypes.array,
  match: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default DrawBox;

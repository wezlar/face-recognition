import React from 'react';
import PropTypes from 'prop-types';

const boxStyle = {
  backgroundColor: 'blue',
  border: 'solid',
  borderColor: 'blue',
  marginTop: 0,
  color: '#fff',
};

export const DrawNameBox = (props = {}) => {
  const { match, index, width, height } = props;
  if (!match || !match[index]) {
    return null;
  };
  
  return (
    <p
      style={{
        ...boxStyle,
        width,
        transform: `translate(-3px, ${height}px)`,
      }}>
      {match[index]._label}
    </p>
  );
};

DrawNameBox.propTypes = {
  match: PropTypes.array,
  index: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default DrawNameBox;

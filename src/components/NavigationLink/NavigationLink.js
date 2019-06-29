import React from 'react';
import PropTypes from 'prop-types';

const linkStyle = {
  backgroundColor: 'blue',
  border: 'solid',
  borderColor: 'blue',
  marginTop: 0,
  color: '#fff',
};

export const NavigationLink = (props = {}) => {
  const { isActive = false, label, url = '/' } = props;
  
  return (
    <li>
      <a style={{
        ...linkStyle,
      }}
      href={url}>
        {label}
      </a>
    </li>
  );
};

NavigationLink.propTypes = {
  isActive: PropTypes.bool,
  label: PropTypes.string,
  url: PropTypes.string,
};

export default NavigationLink;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
      <Link style={{
        ...linkStyle,
      }}
      href={url}>
        {label}
      </Link>
    </li>
  );
};

NavigationLink.propTypes = {
  isActive: PropTypes.bool,
  label: PropTypes.string,
  url: PropTypes.string,
};

export default NavigationLink;

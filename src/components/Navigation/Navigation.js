import React from 'react';
import PropTypes from 'prop-types';
import NavigationLink from '../NavigationLink/NavigationLink';

export const Navigation = (props = {}) => {
  const { links = [] } = props;
  
  return (
    <ul>
    {links.map((link, index) => 
      <NavigationLink 
        key={index} 
        label={link.label} 
        url={link.url} />
    )}
    </ul>
  );
};

Navigation.propTypes = {
  links: PropTypes.array,
};

export default Navigation;

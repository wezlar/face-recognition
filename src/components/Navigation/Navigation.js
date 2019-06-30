/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import PropTypes from 'prop-types';
import NavigationLink from '../NavigationLink/NavigationLink';

const style = css`
  color: hotpink;
  display: flex;
  list-style: none;
  margin-top: 0;
  padding-left: 0;
`;

export const Navigation = (props = {}) => {
  const { links = [] } = props;
  
  return (
    <ul css={style}>
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

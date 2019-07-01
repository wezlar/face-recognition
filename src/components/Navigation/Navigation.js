/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import PropTypes from 'prop-types';
import NavigationLink from '../NavigationLink/NavigationLink';

const style = css`
  margin-top: 0;
  padding-left: 0;
  background-color: #3939a0;

  ul {
    list-style: none;
    display: flex;
    padding: 0;
  }
`;

export const Navigation = (props = {}) => {
  const { links = [] } = props;
  
  return (
    <div css={style}>
      <ul>
      {links.map((link, index) => 
        <NavigationLink 
          key={index} 
          label={link.label} 
          url={link.url} />
      )}
      </ul>
    </div>
  );
};

Navigation.propTypes = {
  links: PropTypes.array,
};

export default Navigation;

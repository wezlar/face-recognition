/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const style = css`
  background-color: #3939a0;
  display: block;
  padding: 20px 30px;
  color: #fff;
  &:hover {
    background-color: #272781;
  }
`;

export const NavigationLink = (props = {}) => {
  const { isActive = false, label, url = '/' } = props;
  
  return (
    <li>
      <Link to={url} css={style}>
        {label}
      </Link>
    </li>
  );
};

NavigationLink.propTypes = {
  isActive: PropTypes.bool,
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default NavigationLink;

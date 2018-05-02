import React  from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({label, action, disabled}) => (
  <button onClick={action} disabled={disabled}>
    {label}
  </button>
);

Button.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  action: PropTypes.func,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  disabled: false
};

export default Button;

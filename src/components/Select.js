import React  from 'react';
import PropTypes from 'prop-types';
import './Select.scss'

const Select = ({action, options, defaultOption, value}) => (
    <select onChange={action}>
        {value < 0 && <option>{defaultOption}</option>}
        {options.map((option) => (
            <option value={option.id} key={option.name}>{option.name}</option>
        ))
        }
    </select>
);

Select.propTypes = {
    action: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    defaultOption: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

Select.defaultProps = {
    options: []
};

export default Select;

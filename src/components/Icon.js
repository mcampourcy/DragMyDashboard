import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Icon = ({icon, label}) => (
    <Fragment>
        <i className={`ico ico-${icon}`}> </i>{label}
    </Fragment>
);

Icon.propTypes = {
    icon: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
};

export default Icon;

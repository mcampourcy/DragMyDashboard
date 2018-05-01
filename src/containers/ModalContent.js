import React from 'react';
import PropTypes from 'prop-types';
import './ModalContent.scss';

const ModalContent = ({items, addIndicator}) => (
    <div className="container">
        <div className="row">
            {items.map(item => (
                !item.selected &&
                <div key={item.id} className="col-sm-3 indicatorCard" onClick={addIndicator} data-id={item.id}>
                    { item.icon &&
                    <span className='indicatorIcon'><i className={`ico ico-${item.icon}`}> </i></span>
                    }
                    <h2>{item.name}</h2>
                </div>
            ))
            }
        </div>
    </div>
);

ModalContent.propTypes = {
    items: PropTypes.array.isRequired,
    addIndicator: PropTypes.func.isRequired
};

export default ModalContent;
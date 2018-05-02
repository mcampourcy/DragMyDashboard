import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PlusCircle } from 'react-feather';
import './AddIndicator.scss';
import Modal from './Modal';
import ModalContent from './ModalContent';

class AddIndicator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
    this.addIndicator = this.addIndicator.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  addIndicator(e) {
    this.props.handleChange(parseInt(e.currentTarget.dataset.id));
    this.setState({
      isActive: !this.state.isActive
    });
  }

  handleClick() {
    this.setState({
      isActive: !this.state.isActive
    });
  }

  handleClickOutside(e, node) {
    if(e.target === node) {
      this.setState({isActive: false});
    }
  }

  render() {
    const { indicators } = this.props;
    const { isActive }   = this.state;
    return (
      <Fragment>
        <PlusCircle className="addIcon" size={48} onClick={this.handleClick} />
        {isActive &&
          <Modal event={this.handleClickOutside}>
            <ModalContent addIndicator={this.addIndicator} items={indicators}/>
          </Modal>
        }
      </Fragment>
    );
  }

}

AddIndicator.propTypes = {
  indicators: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default AddIndicator;

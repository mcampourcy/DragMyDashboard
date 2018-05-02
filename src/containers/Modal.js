import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.scss';

const modalRoot = document.querySelector('[is="modal-content"]');

class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.event(e, this.node);
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal" ref={node => { this.node = node; }} onClick={this.handleClick}>
        {this.props.children}
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  event: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired
};

export default Modal;
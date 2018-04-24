import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { X as Close } from 'react-feather';
import Button from '../components/Button';
import Select from '../components/Select';

class AddIndicator extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      value: -1
    }
  }

  handleChange(event) {
    this.setState({
      value: parseInt(event.currentTarget.value)
    });
  }

  handleClick(e) {
    e.preventDefault();
    this.props.changeMenu();
    this.props.addIndicator(this.state.value);
  }

  render() {
    const { indicators } = this.props;
    return (
      <Fragment>
        <span className="closeIcon">
          <Close onClick={this.handleClickMenu}/>
        </span>
        <form>
            <Select
                action={this.handleChange}
                options={indicators.filter(i => !i.selected)}
                defaultOption='Add an indicator'
                value={this.state.value}
            />

            <Button label={`Add the indicator`} action={this.handleClick} disabled={this.state.value <= 0}/>
        </form>
      </Fragment>
    )
  }

}

AddIndicator.propTypes = {
  indicators: PropTypes.array.isRequired
};

export default AddIndicator;

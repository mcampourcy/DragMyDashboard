import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {DragSource, DropTarget} from 'react-dnd';
import { X as Close } from 'react-feather';
import Icon from '../components/Icon';
import './Indicator.scss'

const indicatorSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findIndicator(props.id).index,
    }
  }
};

const indicatorTarget = {
  canDrop() {
    return false
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: hoveredId } = props;

    if (draggedId !== hoveredId) {
      props.moveIndicator(draggedId, hoveredId);
    }
  },
};

class Indicator extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { indicator, onRemove, isDragging, connectDragSource, connectDropTarget } = this.props;
    const { data } = this.props.indicator;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      connectDropTarget(
      <div className='col-sm-4 indicator'>
        <span className='dropIndicator'> </span>
        <div className={`dragIndicator ${indicator.name}`} style={{ opacity }}>
            <span className='closeIcon'>
                <Close onClick={() => onRemove(indicator.id)} />
            </span>
            { indicator.icon &&
              <span className='indicatorIcon'><i className={`ico ico-${indicator.icon}`}> </i></span>
            }
            <h2>{indicator.name}</h2>

            <p className='description'>
                <strong>{data.stock}</strong> {data.name}{data.stock > 1 && 's'}
                <Icon icon='coins' label={data.cost * data.stock}/>
                {data.damages &&
                    <Icon icon='bandage' label={data.damages}/>
                }

            </p>
        </div>
      </div>
    ))
  }

}

Indicator.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  findIndicator: PropTypes.func.isRequired,
  moveIndicator: PropTypes.func.isRequired,
};

export default DropTarget('card', indicatorTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(DragSource('card', indicatorSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))(Indicator));

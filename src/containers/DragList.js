import React, { Component } from 'react';
import PropTypes from 'prop-types';
// ReactDND
import {DragDropContext, DropTarget} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
// Actions
import { connect } from 'react-redux';
import { toggleIndicator, changePosition, fetchPostsIfNeeded } from '../actions/index';
// Containers
import AddIndicator from "./AddIndicator";
import Indicator from "./Indicator";
import ItemTypes from "./ItemTypes";
import Button from '../components/Button';

// DragNDrop
const indicatorTarget = {
    drop() {},
};

class DragList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            noMoreTools: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleClickMenu = this.handleClickMenu.bind(this);
        this.moveIndicator = this.moveIndicator.bind(this);
        this.findIndicator = this.findIndicator.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchPostsIfNeeded());
    }

    handleClick(id) {
        this.props.dispatch(toggleIndicator(id))
    }

    handleClickMenu() {
        this.setState({menu: !this.state.menu})
    }

    /** == Drag N Drop FUNCTIONS == **/

    /**
     * Move a given indicator in the indicators array
     * Two elements are moved : the dragged one, and the one it replaces
     * @param draggedId
     * @param hoveredId
     */
    moveIndicator(draggedId, hoveredId) {
        this.props.dispatch(changePosition(draggedId, hoveredId));
    }

    /**
     * Get the data of a given indicator
     * @param id
     * @returns {{indicator: *, index: *|number}}
     */
    findIndicator(id) {
        const { indicators } = this.props;
        const indicator = indicators.find(i => i.id === id);

        return {
            indicator,
            index: indicators.indexOf(indicator),
        }
    }

    render() {
        const { connectDropTarget, indicators } = this.props;
        return connectDropTarget(
            <div className="row">
                <div className="col-12">
                    <h1>My wonderful Pathfinder Dashboard</h1>
                </div>
                {indicators.length > 0 &&
                    indicators.map(indicator => (
                        indicator.selected &&
                        <Indicator
                            id={indicator.id}
                            indicator={indicator}
                            onRemove={this.handleClick}
                            moveIndicator={this.moveIndicator}
                            findIndicator={this.findIndicator}
                            key={`${indicator.id}`}
                        />
                    ))
                }

                <div className='col-sm-4 indicator'>
                {this.state.menu ?
                    <div className='addIndicator'>
                        <AddIndicator
                            indicators={indicators}
                            changeMenu={this.handleClickMenu}
                            addIndicator={this.handleClick}
                        />
                    </div>
                    :
                    !this.state.noMoreTools &&
                    <div className='dragIndicator'>
                        <Button label='Add an indicator' action={this.handleClickMenu}/>
                    </div>
                }
                </div>
            </div>
        )
    }
}

DragList.propTypes = {
    indicators: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { indicatorsFromUser } = state;
    const {
        items: indicators
    } = indicatorsFromUser["indicators"] || {
        items: []
    };

    return {
        indicators
    }
}

export default connect(mapStateToProps)(DragDropContext(HTML5Backend)(DropTarget
(ItemTypes.CARD, indicatorTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
(DragList)))

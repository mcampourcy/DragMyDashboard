import { CHANGE_POSITION, TOGGLE_INDICATOR, REQUEST_POSTS, RECEIVE_POSTS } from '../actions';

const defaultState = {
    isFetching: false,
    didInvalidate: false,
    indicators: []
};

function filterPosition(key1, key2){
    return key1.position > key2.position;
}

function monSuperTest(state = defaultState, action) {
    console.log(action.type)
    switch (action.type) {
        case REQUEST_POSTS:
            const requestState = {
                isFetching: true,
                didInvalidate: false
            };
            return {...state, ...requestState};
        case RECEIVE_POSTS: {
            const receiveState =  {
                isFetching: false,
                didInvalidate: false,
                indicators: action.posts
            };
            return {...state, ...receiveState};
        }
        case TOGGLE_INDICATOR: {
            const toggledIndicators = state.indicators.map(indicator => (
                (indicator.id === action.id)
                    ? {...indicator, selected: !indicator.selected}
                    : indicator
            ));
            const toggleState = {
                isFetching: false,
                didInvalidate: false,
                indicators: toggledIndicators
            };
            return {...state, ...toggleState};
        }
        case CHANGE_POSITION: {
            const draggedPosition = state.indicators.find(item => action.draggedId === item.id).position;
            const hoveredPosition = state.indicators.find(item => action.hoveredId === item.id).position;
            const positionedBlocks = state.indicators.map(item => {
                if (action.draggedId === item.id) {
                    item.position = hoveredPosition;
                } else if (action.hoveredId === item.id) {
                    item.position = draggedPosition;
                }
                return item;
            });
            const positionState = {
                isFetching: false,
                didInvalidate: false,
                indicators: positionedBlocks
            };
            positionState.indicators.sort(filterPosition);
            return {...state, ...positionState};
        }
        default: {
            return state;
        }
    }
}

export default monSuperTest;

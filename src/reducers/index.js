import { combineReducers } from 'redux';
import {
  CHANGE_POSITION,
  TOGGLE_INDICATOR,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from '../actions';

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
  case REQUEST_POSTS: {
    const requestState = {
      isFetching: true,
      didInvalidate: false
    };
    return {...state, ...requestState};
  }
  case RECEIVE_POSTS: {
    const receiveState =  {
      isFetching: false,
      didInvalidate: false,
      items: action.posts
    };
    return {...state, ...receiveState};
  }
  case TOGGLE_INDICATOR: {
    const toggledIndicators = state.items.map(indicator => (
      (indicator.id === action.id)
        ? {...indicator, selected: !indicator.selected}
        : indicator
    ));
    const toggleState = {
      isFetching: false,
      didInvalidate: false,
      items: toggledIndicators
    };
    return {...state, ...toggleState};
  }
  case CHANGE_POSITION: {
    const draggedPosition = state.items.find(item => action.draggedId === item.id).position;
    const hoveredPosition = state.items.find(item => action.hoveredId === item.id).position;
    const positionedBlocks = state.items.map(item => {
      if(action.draggedId === item.id) {
        item.position = hoveredPosition;
      } else if(action.hoveredId === item.id) {
        item.position = draggedPosition;
      }
      return item;
    });
    const positionState = {
      isFetching: false,
      didInvalidate: false,
      items: positionedBlocks
    };
    return {...state, ...positionState};
  }
  default: {
    return state;
  }
  }
}

function filterPosition(key1, key2){
  return key1.position > key2.position;
}

function indicatorsFromUser(state = {}, action) {
  switch (action.type) {
  case RECEIVE_POSTS:
  case REQUEST_POSTS:
  case TOGGLE_INDICATOR:
  case CHANGE_POSITION: {
    const postIndicators = posts(state['indicators'], action);
    postIndicators.items.sort(filterPosition);
    const indicators = {
      ['indicators']: postIndicators
    };
    return {...state, ...indicators};
  }
  default: {
    return state;
  }
  }
}

const rootReducer = combineReducers({
  indicatorsFromUser
});

export default rootReducer;

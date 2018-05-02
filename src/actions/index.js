import data from '../data/test.json';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const TOGGLE_INDICATOR = 'TOGGLE_INDICATOR';
export const CHANGE_POSITION = 'CHANGE_POSITION';

export function toggleIndicator(id) {
  return {
    type: TOGGLE_INDICATOR,
    id
  };
}

export function changePosition(draggedId, hoveredId) {
  return {
    type: CHANGE_POSITION,
    draggedId,
    hoveredId
  };
}

function requestPosts() {
  return {
    type: REQUEST_POSTS
  };
}

function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json
  };
}

function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts());
    dispatch(receivePosts(data));
  };
}

function shouldFetchPosts(state) {
  const indicators = state.indicatorsFromUser['indicators'];
  if (!indicators) {
    return true;
  } else if (indicators.isFetching) {
    return false;
  } else {
    return indicators.didInvalidate;
  }
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts());
    }
  };
}

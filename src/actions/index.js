import data from '../data/test';
import { changePosition } from "./changePosition";
import { receivePosts } from "./receivePosts";
import { requestPosts } from "./requestPosts";
import { toggleIndicator } from "./toggleIndicator";

const fetchPosts = () => {
    return dispatch => {
        dispatch(requestPosts());
        dispatch(receivePosts(data));
    };
};

const shouldFetchPosts = (state) => {
    const indicators = state.indicators;
    if (indicators.length === 0 || !indicators) {
        return true;
    } else if (indicators.isFetching) {
        return false;
    } else {
        return indicators.didInvalidate;
    }
};

const manageIndicators = () => {
    return (dispatch, getState) => {
        if (shouldFetchPosts(getState())) {
            return dispatch(fetchPosts());
        }
    };
};

export {
  changePosition,
  manageIndicators,
  receivePosts,
  requestPosts,
  toggleIndicator
};
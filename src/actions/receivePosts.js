export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const receivePosts = (json) => {
    return {
        type: RECEIVE_POSTS,
        posts: json
    };
};

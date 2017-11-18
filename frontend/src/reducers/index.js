import { combineReducers } from 'redux';
import { SET_CATEGORIES, SET_POSTS, UPDATE_POST, UPDATE_POSTS, SET_COMMENTS } from '../actions'

const initialCategoriesState = []
const initialPostsState = []
const initialCommentsState = []

function categories (state = initialCategoriesState, action) {
    switch (action.type) {
        case SET_CATEGORIES :
            const { categories } = action
            return categories
        default :
            return state
    }
}

function posts (state = initialPostsState, action) {
    switch (action.type) {
        case SET_POSTS, UPDATE_POSTS :
            const { posts } = action
            return posts
        case UPDATE_POST :

            const { post } = action

            console.log('post: ' + post)
            const newState = []
            newState.push(...state)
            const index = newState.findIndex(x => x.id === post.id);
            if (index && index >= 0) {
                newState[index] = post;
            } else {
                newState.push(post)
            }
            return newState
        default :
            return state
    }
}

function comments (state = initialCommentsState, action) {
    // TODO change to structure with postId and list of comments
    switch (action.type) {
        case SET_COMMENTS :
            const { comments } = action
            return comments
        default :
            return state
    }
}

export default combineReducers({categories, posts, comments})
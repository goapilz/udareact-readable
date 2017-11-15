import { combineReducers } from 'redux';
import { SET_CATEGORIES, SET_POSTS, UPDATE_POST, SET_COMMENTS_OF_POST } from '../actions'

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
        case SET_POSTS :
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

function commentsOfPost (state = initialCommentsState, action) {
    switch (action.type) {
        case SET_COMMENTS_OF_POST :
            const { commentsOfPost } = action
            return commentsOfPost
        default :
            return state
    }
}

export default combineReducers({categories, posts, commentsOfPost})
import { combineReducers } from 'redux';
import { SET_CATEGORIES, SET_POSTS, SET_COMMENTS_OF_POST } from '../actions'

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
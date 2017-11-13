import { combineReducers } from 'redux';
import { RELOAD } from '../actions'

const initialCategoriesState = []
const initialPostsState = []
const initialCommentsState = []

function categories (state = initialCategoriesState, action) {
    switch (action.type) {
        case RELOAD :
            const { categories } = action
            return categories
        default :
            return state
    }
}

function posts (state = initialPostsState, action) {
    switch (action.type) {
        case RELOAD :
            const { posts } = action
            return posts
        default :
            return state
    }
}

function comments (state = initialCommentsState, action) {
    switch (action.type) {
        case RELOAD :
            const { comments } = action
            return comments
        default :
            return state
    }
}

export default combineReducers({categories, posts, comments})
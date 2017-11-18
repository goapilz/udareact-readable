import {combineReducers} from 'redux';
import {SET_CATEGORIES, SET_POSTS, UPDATE_POST, UPDATE_POSTS, SET_COMMENTS, UPDATE_COMMENT, UPDATE_COMMENTS} from '../actions'

const initialCategoriesState = []
const initialPostsState = []
const initialCommentsState = []

function categories(state = initialCategoriesState, action) {
    switch (action.type) {
        case SET_CATEGORIES : {
            const {categories} = action
            return categories
        }
        default :
            return state
    }
}

function mergeElements(existingState, newOrUpdatedElements) {
    // 'clone' state
    const newState = []
    newState.push(...existingState)

    // merge (update / add)
    for (const element of newOrUpdatedElements) {
        const index = newState.findIndex(x => x.id === element.id);
        if (index >= 0) {
            newState[index] = element
        } else {
            newState.push(element)
        }
    }
    return newState
}


function posts(state = initialPostsState, action) {
    switch (action.type) {
        case SET_POSTS : {
            const {posts} = action
            return posts
        }
        case UPDATE_POSTS : {
            const {posts} = action
            return mergeElements(state, posts)
        }
        case UPDATE_POST : {
            const {post} = action
            return mergeElements(state, [post])
        }
        default :
            return state
    }
}

function comments(state = initialCommentsState, action) {
    switch (action.type) {
        case SET_COMMENTS : {
            const {comments} = action
            return comments
        }
        case UPDATE_COMMENTS : {
            const {comments} = action
            return mergeElements(state, comments)
        }
        case UPDATE_COMMENT : {
            const {comment} = action
            return mergeElements(state, [comment])
        }
        default :
            return state
    }
}

export default combineReducers({categories, posts, comments})
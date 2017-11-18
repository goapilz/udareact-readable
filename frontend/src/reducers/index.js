import {combineReducers} from 'redux';
import {SET_CATEGORIES, SET_POSTS, UPDATE_POST, UPDATE_POSTS, SET_COMMENTS, UPDATE_COMMENT} from '../actions'

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

function posts(state = initialPostsState, action) {
    switch (action.type) {
        case SET_POSTS : {
            const {posts} = action
            return posts
        }
        case UPDATE_POSTS : {
            // TODO also do a merge for UPDATE_POSTS
            const {posts} = action
            return posts
        }
        case UPDATE_POST : {
            const {post} = action
            // merge with existing state
            const newState = []
            newState.push(...state)
            // find post and do an update or add
            const index = newState.findIndex(x => x.id === post.id);
            if (index >= 0) {
                console.log(newState[index])
                newState[index] = post
            } else {
                newState.push(post)
            }
            return newState
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
        case UPDATE_COMMENT : {
            const {comment} = action

            const newState = []
            newState.push(...state)

            const index = newState.findIndex(x => x.id === comment.id);
            if (index >= 0) {
                newState[index] = comment
            } else {
                newState.push(comment)
            }
            return newState
        }
        default :
            return state
    }
}

export default combineReducers({categories, posts, comments})
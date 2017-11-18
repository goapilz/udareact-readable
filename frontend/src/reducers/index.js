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
            // TODO also do a merge for UPDATE_POSTS
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
    // structure with postId as key and array of comments
    // TODO do this also for posts ?
    switch (action.type) {
        case SET_COMMENTS : {
            const {comments} = action
            const newState = []
            for (const comment of comments) {
                const postId = comment.parentId
                // init new array for unknown key (postId)
                if (!newState[postId]) {
                    newState[postId] = []
                }
                // append comments for postId
                newState[postId].push(comment)
            }
            return newState
        }
        case UPDATE_COMMENT : {
            const {comment} = action
            // merge with existing state
            const newState = []
            newState.push(...state)

            // find comment and do an update or add
            const postId = comment.parentId
            const index = newState[postId].findIndex(x => x.id === comment.id);
            if (index >= 0) {
                newState[postId][index] = comment
            } else {
                newState[postId].push(comment)
            }

            return newState
        }
        default :
            return state
    }
}

export default combineReducers({categories, posts, comments})
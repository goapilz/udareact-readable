import * as ReadableAPI from './../util/ReadableAPI'

export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_POSTS = 'SET_POSTS'
export const UPDATE_POST = 'UPDATE_POST'
export const UPDATE_POSTS = 'UPDATE_POSTS'
export const SET_COMMENTS = 'SET_COMMENTS'

export function setCategories({categories}) {
    return {
        type: SET_CATEGORIES,
        categories
    }
}

export function setPosts({posts}) {
    return {
        type: SET_POSTS,
        posts
    }
}

export function updatePosts({posts}) {
    return {
        type: UPDATE_POSTS,
        posts
    }
}

export function updatePost({post}) {
    return {
        type: UPDATE_POST,
        post
    }
}

export function setComments({comments}) {
    return {
        type: SET_COMMENTS,
        comments
    }
}

export const reloadCategories = () => dispatch => (
    ReadableAPI.getCategories().then((data) => {
        dispatch(setCategories({categories: data}))
    })
)

export const reloadPosts = () => dispatch => (
    ReadableAPI.getPosts().then((data) => {
        dispatch(setPosts({posts: data}))
    })
)

export const reloadPostsForCategory = (categoryId) => dispatch => (
    ReadableAPI.getPostsForCategory(categoryId).then((data) => {
        // curretly does the same as setPosts - optimization: merge new posts into existent in future
        dispatch(updatePost({posts: data}))
    })
)

export const reloadPost = (postId) => dispatch => (
    ReadableAPI.getPost(postId).then((data) => {
        if (data) {
            dispatch(updatePost({post: data}))
        }
    })
)

export const reloadCommentsForPost = (postId) => dispatch => (
    ReadableAPI.getCommentsForPost(postId).then((data) => {
        // remember commets per postId ?? does not make much sense because the user wants fresh data when switching pages/views
        dispatch(setComments({comments: data}))
    })
)
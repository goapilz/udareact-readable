import * as ReadableAPI from './../util/ReadableAPI'

export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_POSTS = 'SET_POSTS'
export const UPDATE_POST = 'UPDATE_POST'
export const SET_POSTS_OF_CATEGORY = 'SET_POSTS_OF_CATEGORY'
export const SET_COMMENTS_OF_POST = 'SET_COMMENTS_OF_POST'

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

export function updatePost({post}) {
    return {
        type: UPDATE_POST,
        post
    }
}

export function setComments({commentsOfPost}) {
    return {
        type: SET_COMMENTS_OF_POST,
        commentsOfPost
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
        // use update posts ?
        dispatch(setPosts({posts: data}))
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
        dispatch(setComments({commentsOfPost: data}))
    })
)


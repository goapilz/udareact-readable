import * as ReadableAPI from './../util/ReadableAPI'

export const SET_CATEGORIES = 'SET_CATEGORIES'

export const SET_POSTS = 'SET_POSTS'
export const UPDATE_POST = 'UPDATE_POST'
export const UPDATE_POSTS = 'UPDATE_POSTS'

export const SET_COMMENTS = 'SET_COMMENTS'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS'

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

export function updatePosts({posts}) {
    return {
        type: UPDATE_POSTS,
        posts
    }
}


export function setComments({comments}) {
    return {
        type: SET_COMMENTS,
        comments
    }
}

export function updateComment({comment}) {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

export function updateComments({comments}) {
    return {
        type: UPDATE_COMMENTS,
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
        dispatch(updatePosts({posts: data}))
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
        if (data) {
            dispatch(updateComments({comments: data}))
        }
    })
)

export const voteForPost = (postId, option) => dispatch => (
    ReadableAPI.voteForPost(postId, option).then((data) => {
        dispatch(updatePost({post: data}))
    })
)

export const voteForComment = (commentId, option) => dispatch => (
    ReadableAPI.voteForComment(commentId, option).then((data) => {
        dispatch(updateComment({comment: data}))
    })
)

export const addCommentForPost = (postId, author, body) => dispatch => (
    ReadableAPI.addComment(postId, author, body).then((data) => {
        if (data) {
            dispatch(updateComment({comment: data}))
        }
    })
)
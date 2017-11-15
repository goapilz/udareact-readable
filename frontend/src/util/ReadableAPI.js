const APP_BACKEND = process.env.REACT_APP_BACKEND

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const getCategories = () =>
    // {credentials: 'include'} ??
    fetch(`${APP_BACKEND}/categories`, {headers})
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return data.categories
        })

export const getPosts = () =>
    fetch(`${APP_BACKEND}/posts`, {headers})
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return data
        })

export const getPost = (postId) =>
    fetch(`${APP_BACKEND}/posts/${postId}`, {headers})
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return data
        })

export const getPostsForCategory = (categoryId) =>
    fetch(`${APP_BACKEND}/${categoryId}/posts`, {headers})
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return data
        })

export const getCommentsForPost = (postId) =>
    fetch(`${APP_BACKEND}/posts/${postId}/comments`, {headers})
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return data
        })

export const addPost = (categoryId, postId) => {
    // categoryId needed ?
    // if this method will return the new post the id can be generated
}

export const updatePost = (postObject) => {
    // this method should return the updated post
    // can also be used for voting
}

export const deletePost = (postId) => {
    // should delete the post an all comments
}


export const addComment = (postId, commentId) => {
    // postId is needed to fill the parentId
    // if this method will return the new comment the id can be generated
}
export const updateComment = (commentObject) => {
    // this method should return the updated comment
    // can also be used for voting
}
export const deleteComment = (commentId) => {
    // should delete the comment
}
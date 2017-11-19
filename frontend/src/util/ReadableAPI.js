const APP_BACKEND = process.env.REACT_APP_BACKEND

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
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

export const voteForPost = (postId, option) =>
    fetch(`${APP_BACKEND}/posts/${postId}`, {
        method: 'POST', headers, body: JSON.stringify({
            option: option
        })
    }).then((res) => {
        return res.json()
    }).then((data) => {
        return data
    })

export const voteForComment = (commentId, option) =>
    fetch(`${APP_BACKEND}/comments/${commentId}`, {
        method: 'POST', headers, body: JSON.stringify({
            option: option
        })
    }).then((res) => {
        return res.json()
    }).then((data) => {
        return data
    })

export const addPost = (categoryId, author, title, body) =>
    fetch(`${APP_BACKEND}/posts/`, {
        method: 'POST', headers, body: JSON.stringify({
            category: categoryId,
            author: author,
            title: title,
            body: body
        })
    }).then((res) => {
        return res.json()
    }).then((data) => {
        return data
    })

export const addComment = (postId, author, body) =>
    fetch(`${APP_BACKEND}/comments/`, {
        method: 'POST', headers, body: JSON.stringify({
            parentId: postId,
            author: author,
            body: body
        })
    }).then((res) => {
        return res.json()
    }).then((data) => {
        return data
    })

export const deletePost = (postId) =>
    fetch(`${APP_BACKEND}/posts/${postId}`, {
        method: 'DELETE', headers
    }).then((res) => {
        return res.json()
    }).then((data) => {
        return data
    })

export const deleteComment = (commentId) =>
    fetch(`${APP_BACKEND}/comments/${commentId}`, {
        method: 'DELETE', headers
    }).then((res) => {
        return res.json()
    }).then((data) => {
        return data
    })

export const editPost = (postId, author, title, body) =>
    fetch(`${APP_BACKEND}/posts/${postId}`, {
        method: 'PUT', headers, body: JSON.stringify({
            author: author,
            title: title,
            body: body
        })
    }).then((res) => {
        return res.json()
    }).then((data) => {
        return data
    })

export const editComment = (commentId, title, body) =>
    fetch(`${APP_BACKEND}/comments/${commentId}`, {
        method: 'PUT', headers, body: JSON.stringify({
            title: title,
            body: body
        })
    }).then((res) => {
        return res.json()
    }).then((data) => {
        return data
    })


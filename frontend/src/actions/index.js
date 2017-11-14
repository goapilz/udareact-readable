import * as ReadableAPI from './../util/ReadableAPI'

export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_POSTS = 'SET_POSTS'
export const SET_POSTS_OF_CATEGORY = 'SET_POSTS_OF_CATEGORY'
export const SET_COMMENTS_OF_POST = 'SET_COMMENTS_OF_POST'

export function setCategories({ categories }) {
    return {
        type: 'SET_CATEGORIES',
        categories
    }
}

export function setPosts({ posts }) {
    return {
        type: 'SET_POSTS',
        posts
    }
}

export function setComments({ commentsOfPost }) {
    return {
        type: 'SET_COMMENTS_OF_POST',
        commentsOfPost
    }
}
 
export const reloadCategories = () => dispatch => (
    ReadableAPI.getCategories().then((data) => {
        dispatch(setCategories({categories:data}))
    })
)

export const reloadPosts = () => dispatch => (
    ReadableAPI.getPosts().then((data) => {
        dispatch(setPosts({posts:data}))
    })
)

export const reloadPostsForCategory = (categoryId) => dispatch => (
    ReadableAPI.getPostsForCategory(categoryId).then((data) => {
        // TODO check if needed - always read all posts ? or separate load for category page
        // dispatch(reload({categories:data, posts: [], comments: []}))
    })
)

export const reloadCommentsForPost = (postId) => dispatch => (
    ReadableAPI.getCommentsForPost(postId).then((data) => {
        dispatch(setComments({commentsOfPost:data}))
    })
)


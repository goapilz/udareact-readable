import * as ReadableAPI from './../util/ReadableAPI'

export const RELOAD = 'RELOAD'

export function reload({ categories, posts, comments }) {
    return {
        type: 'RELOAD',
        categories,
        posts,
        comments
    }
}

export const fetchCategories = () => dispatch => (
    ReadableAPI.getAllCategories().then((data) => {
        console.log(data)
        dispatch(reload({categories:data, posts: [], comments: []}))
    })
)


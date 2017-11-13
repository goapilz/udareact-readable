export const RELOAD = 'RELOAD'

export function reload({ categories, posts, comments }) {
    return {
        type: 'RELOAD',
        categories,
        posts,
        comments
    }
}
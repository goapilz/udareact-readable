const APP_BACKEND = process.env.REACT_APP_BACKEND

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const getAllCategories = () =>
    // {credentials: 'include'} ??
    fetch(`${APP_BACKEND}/categories`, {headers})
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return data.categories
        })

import React, {Component} from 'react'
import './../css/App.css'
import {reloadCategories, reloadPosts} from '../actions'
import FaRefresh from 'react-icons/lib/fa/refresh'
import CategoryView from './CategoryView'
import RootView from './RootView'
import {Link, Route, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
class App extends Component {

    state = {
        sortorder: 'name'
    }

    componentDidMount() {
        const {reloadCategories, reloadPosts} = this.props
        reloadCategories()
        reloadPosts()
        // reloadCommentsForPost('8xf0y6ziyjabvozdd253nd')
    }

    getCategory (categories, categoryId) {
        return categories.find(x => x.path ===categoryId)
     }
    render() {
        const {reloadCategories, reloadPosts} = this.props
        const {categories, posts} = this.props // not state ?

        // {JSON.stringify(commentsForPost)}
        // <div>posts: {JSON.stringify(posts)}</div>

        // use routes with components https://github.com/reactjs/react-router-tutorial/tree/master/lessons/06-params

        return (
            <div>
                <Route exact path='/' component={RootView}/>
                <Route path='/category/:categoryId' component={CategoryView}/>
            </div>
        )
    }
}


function mapStateToProps({categories, posts}) {
    return {
        categories,
        posts: categories.map((categoryValue) => ({
            category: categoryValue.name,
            posts: posts.filter(post => post.category === categoryValue.name)
        }))
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reloadCategories: () => dispatch(reloadCategories()),
        reloadPosts: () => dispatch(reloadPosts()),
        // reloadCommentsForPost: (postId) => dispatch(reloadCommentsForPost(postId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
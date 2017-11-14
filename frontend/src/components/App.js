import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './../css/App.css'
import {reloadCategories, reloadPosts, reloadCommentsForPost} from '../actions'
import {connect} from 'react-redux';
import FaRefresh from 'react-icons/lib/fa/refresh'

class App extends Component {

    /*state = {
        categories: [],
        posts: [],
        comments: []
    }*/

    componentDidMount() {
        const {reloadCategories, reloadPosts, reloadCommentsForPost} = this.props
        reloadCategories()
        reloadPosts()
        reloadCommentsForPost('8xf0y6ziyjabvozdd253nd')
    }


    render() {
        const {reloadCategories, reloadPosts, reloadCommentsForPost} = this.props
        const {categories, posts, commentsForPost} = this.props // not state ?

        return (
            <div className="category-overview">
                {categories.map((category) => (
                    <div className="category-header" key={category.name}>
                        <Link to={`/category/${category.path}`} className='open-category'>{category.name}</Link>
                    </div>
                ))}
                <div>posts: {JSON.stringify(posts)}</div>
                <div>comments(8xf0y6ziyjabvozdd253nd): {JSON.stringify(commentsForPost)}</div>
                <button onClick={() => {
                    reloadCategories()
                    reloadPosts()
                    reloadCommentsForPost('8xf0y6ziyjabvozdd253nd')
                }} className='icon-btn'>
                    <FaRefresh size={30}/>
                </button>
            </div>
        )
    }
}

function mapStateToProps({categories, posts, commentsForPost}) {
    return {
        categories,
        posts,
        commentsForPost
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reloadCategories: () => dispatch(reloadCategories()),
        reloadPosts: () => dispatch(reloadPosts()),
        reloadCommentsForPost: (postId) => dispatch(reloadCommentsForPost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

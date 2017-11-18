import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {reloadPost} from '../actions'
import PostComp from './PostComp'

class PostView extends React.Component {

    componentDidMount() {
        const {reloadPost} = this.props
        const {postId} = this.props.match.params

        if (!this.getPost()) {
            reloadPost(postId)
        }
    }

    getPost() {
        const {posts} = this.props
        const {postId} = this.props.match.params
        const post = posts.find(post => post.id === postId)
        return post
    }

    render() {
        const {categories} = this.props

        const post = this.getPost()
        const category = post && categories.find(value => value.path === post.category)

        return (
            <div>
                <Link className='category-header'
                      to={category ? `/category/${post.category}` : '/'}>Back
                    to {category ? category.name : 'Overview'}</Link>
                {post && (<PostComp post={post}/>)}
            </div>
        )
    }
}

function mapStateToProps({categories, posts}) {
    // called before componentDidMount is called - no access to match props
    return {
        categories,
        posts // only extract post of id ? (not possible her because it is not possible to access the postId)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reloadPost: (postId) => dispatch(reloadPost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)
import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {reloadPost} from '../../actions/index'
import PostComp from './PostComp'

class PostView extends React.Component {

    componentDidMount() {
        const {reloadPost} = this.props
        const {postId} = this.props.match.params
        // the categoryId is not really needed because it is part of the post
        // const {categoryId} = this.props.match.params

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
            <div className="app-one-column">
                <Link className='back-link'
                      to={category ? `/category/${post.category}` : '/'}>Back
                    to {category ? category.name : 'Overview'}</Link>
                {post ? (<PostComp post={post}/>) : (<div className='back-link'>deleted</div>)}
            </div>
        )
    }
}

function mapStateToProps({categories, posts}) {
    // called before componentDidMount is called - no access to match props
    return {
        categories,
        posts // only extract post of id ? (not possible here because i cannot access the postId from props.match)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reloadPost: (postId) => dispatch(reloadPost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)
import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {reloadPost, reloadCommentsForPost} from '../actions'
import PostComp from './PostComp'

class PostView extends React.Component {

    state = {
        postEditable: false,
        editableCommentId: -1
    }

    componentDidMount() {
        console.log("componentDidMount PostView")

        const {reloadPost, reloadCommentsForPost} = this.props
        const {postId} = this.props.match.params

        if (!this.getPost()) {
            reloadPost(postId)
        }

        // always reload comments for post
        reloadCommentsForPost(postId)
    }

    getPost() {
        const {posts} = this.props
        const {postId} = this.props.match.params
        const post = posts.find(post => post.id === postId)
        return post
    }

    getComments() {
        const {comments} = this.props
        const {postId} = this.props.match.params
        const commentsOfPost = comments && comments[postId] ? comments[postId] : []
        return commentsOfPost
    }

    render() {
        console.log("componentDidMount PostView")

        const {categories} = this.props

        const post = this.getPost()
        const category = post && categories.find(value => value.path === post.category)
        const comments = this.getComments()

        return (
            <div>
                {post && (<PostComp post={post} comments={comments}/>)}
                <Link className='category-header'
                      to={category ? `/category/${post.category}` : '/'}>Back
                    to {category ? category.name : 'Overview'}</Link>
            </div>
        )
    }
}

function mapStateToProps({categories, posts, comments}) {
    // called before componentDidMount is called - no access to match props
    return {
        categories,
        posts, // only extract post of id ? (not possible her because it is not possible to access the postId)
        comments // only comments of id ? (not possible her because it is not possible to access the postId)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reloadPost: (postId) => dispatch(reloadPost(postId)),
        reloadCommentsForPost: (postId) => dispatch(reloadCommentsForPost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)
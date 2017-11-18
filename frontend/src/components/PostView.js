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
        const {posts} = this.props
        const {reloadPost} = this.props
        const {postId} = this.props.match.params

        const post = posts.find(post => post.id === postId)

        if (!post) {
            console.log('reload post ' + postId)
            reloadPost(postId)
        }

        // always reload comments for post
        reloadCommentsForPost(postId);
    }

    render() {
        const {posts, categories, comments} = this.props
        const {postId} = this.props.match.params

        const post = posts.find(post => post.id === postId)

        const category = post && categories.find(value => value.path === post.category)


        if (post) {
            return (
                <div>
                    <PostComp post={post}/>
                    <Link className='category-header'
                          to={category ? `/category/${post.category}` : '/'}>Back
                        to {category ? category.name : 'Overview'}</Link>
                </div>
            )
        } else {
            return (
                <div>
                    <Link className='category-header'
                          to={category ? `/category/${post.category}` : '/'}>Back
                        to {category ? category.name : 'Overview'}</Link>
                </div>
            )
        }
    }
}

function mapStateToProps({categories, posts, comments}) {
    // called before componentDidMount is called - no access to match props
    return {
        categories,
        posts, // only extract post of id ?
        comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reloadPost: (postId) => dispatch(reloadPost(postId)),
        reloadCommentsForPost: (postId) => dispatch(reloadCommentsForPost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)
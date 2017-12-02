import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {reloadPost} from '../../actions/index'
import PostComp from './PostComp'

class PostView extends React.Component {

    componentDidMount() {
        const {reloadPost} = this.props
        const {post} = this.props

        // the categoryId is not really needed because it is part of the post
        // const {categoryId} = this.props.match.params
        if (!post) {
            const {postId} = this.props.match.params
            reloadPost(postId)
        }
    }

    render() {
        const {categories, post} = this.props
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

function mapStateToProps({categories, posts}, ownProps) {
    const {postId} = ownProps.match.params
    // only extract post of id
    const post = posts.find(post => post.id === postId)
    return {
        categories,
        post
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reloadPost: (postId) => dispatch(reloadPost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)
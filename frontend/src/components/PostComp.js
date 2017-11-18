import React from 'react'
import PropTypes from 'prop-types'
import Time from 'react-time'
import CommentComp from './CommentComp'
import {voteForPost, reloadCommentsForPost} from '../actions'
import {connect} from 'react-redux'

class PostComp extends React.Component {

    static propTypes = {
        post: PropTypes.object.isRequired
    }

    votePost = (post, option) => {
        const {voteForPost} = this.props
        voteForPost(post.id, option)
    }

    componentDidMount() {
        const {reloadCommentsForPost} = this.props
        const {post} = this.props

        // always reload comments for post
        reloadCommentsForPost(post.id)
    }


    render() {
        const {post, comments} = this.props

        return (
            <div className='post-details'>
                <div>Title: {post.title}</div>
                <div>Content: {post.body}</div>
                <div>Author: {post.author}</div>
                <div>Date: <Time value={post.timestamp} titleFormat='YYYY/MM/DD HH:mm'/></div>
                <div>
                    <button className='btn-vote-up' onClick={() => {
                        this.votePost(post, 'upVote')
                    }}>upVote
                    </button>
                    <button className='btn-vote-down' onClick={() => {
                        this.votePost(post, 'downVote')
                    }}>downVote
                    </button>
                    VoteScore: {post.voteScore}
                </div>
                {comments.length > 0 && (<div className='comments-block'>Comments:</div>)}
                {comments.map((comment) => (
                    <CommentComp key={comment.id} comment={comment}/>
                ))}
            </div>
        )
    }
}

function mapStateToProps({comments}) {
    return {comments}
}

function mapDispatchToProps(dispatch) {
    return {
        voteForPost: (postId, option) => dispatch(voteForPost(postId, option)),
        reloadCommentsForPost: (postId) => dispatch(reloadCommentsForPost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostComp)

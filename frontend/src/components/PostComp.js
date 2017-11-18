import React from 'react'
import PropTypes from 'prop-types'
import Time from 'react-time'
import CommentComp from './PostComp'

class PostComp extends React.Component {

    static propTypes = {
        post: PropTypes.object.isRequired,
        comments: PropTypes.array.isRequired
    }

    render() {
        const {post, comments} = this.props

        return (
            <div className='post-details'>
                <div>Title: {post.title}</div>
                <div>Content: {post.body}</div>
                <div>Author: {post.author}</div>
                <div>Date: <Time value={post.timestamp} titleFormat='YYYY/MM/DD HH:mm'/></div>
                <div>VoteScore: {post.voteScore}</div>

                {comments.map((comment) => (
                    <CommentComp key={comment.id} comment={comment}/>
                ))}
            </div>
        )
    }
}

export default PostComp
import React from 'react'
import PropTypes from 'prop-types'
import Time from 'react-time'

class CommentComp extends React.Component {

    static propTypes = {
        comment: PropTypes.object.isRequired
    }

    state = {
        editMode: false
    }

    voteComment = (comment) => {
        alert(`vote for comment ${comment.id}`)
    }

    render() {
        const {comment} = this.props

        return (
            <div className='comment'>
                <div>Content: {comment.body}</div>
                <div>Author: {comment.author}</div>
                <div>Date: <Time value={comment.timestamp} titleFormat='YYYY/MM/DD HH:mm'/></div>
                <div>VoteScore: {comment.voteScore}<button className='btn-vote' onClick={() => { this.voteComment(comment)}}>vote</button></div>
            </div>
        )
    }
}

export default CommentComp
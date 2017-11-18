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

    render() {
        const {comment} = this.props

        return (
            <div className='post-details'>
                <div>Content: {comment.body}</div>
                <div>Author: {comment.author}</div>
                <div>Date: <Time value={comment.timestamp} titleFormat='YYYY/MM/DD HH:mm'/></div>
                <div>VoteScore: {comment.voteScore}</div>
            </div>
        )
    }
}

export default CommentComp
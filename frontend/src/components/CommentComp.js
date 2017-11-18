import React from 'react'
import PropTypes from 'prop-types'
import Time from 'react-time'
import {voteForComment} from '../actions'
import {connect} from 'react-redux'

class CommentComp extends React.Component {

    static propTypes = {
        comment: PropTypes.object.isRequired
    }

    voteComment = (comment, option) => {
        const {voteForComment} = this.props
        voteForComment(comment.id, option)
    }

    render() {
        const {comment} = this.props

        return (
            <div className='comment'>
                <div>Content: {comment.body}</div>
                <div>Author: {comment.author}</div>
                <div>Date: <Time value={comment.timestamp} titleFormat='YYYY/MM/DD HH:mm'/></div>
                <div>
                    <button className='btn-vote-up' onClick={() => {
                        this.voteComment(comment, 'upVote')
                    }}>upVote
                    </button>
                    <button className='btn-vote-down' onClick={() => {
                        this.voteComment(comment, 'downVote')
                    }}>downVote
                    </button>
                    VoteScore: {comment.voteScore}</div>
            </div>
        )
    }
}

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        voteForComment: (commentId, option) => dispatch(voteForComment(commentId, option))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentComp)
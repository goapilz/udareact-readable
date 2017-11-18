import React from 'react'
import PropTypes from 'prop-types'
import Time from 'react-time'
import {voteForComment} from '../actions'
import {VOTE_UP, VOTE_DOWN} from '../util/Constants'
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
            <div>
                <textarea className='content' defaultValue={comment.body}/>
                <div className='meta-infos'>
                    <button className='btn-vote-up' onClick={() => {
                        this.voteComment(comment, VOTE_UP)
                    }}/>
                    <button className='btn-vote-down' onClick={() => {
                        this.voteComment(comment, VOTE_DOWN)
                    }}/>
                    Score {comment.voteScore}</div>
                <div className='meta-infos'>
                    Author: {comment.author} / Date: <Time value={comment.timestamp} format='YYYY/MM/DD HH:mm'/>
                </div>
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
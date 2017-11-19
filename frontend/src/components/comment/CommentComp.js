import React from 'react'
import PropTypes from 'prop-types'
import Time from 'react-time'
import {voteForComment,deleteComment} from '../../actions/index'
import {VOTE_UP, VOTE_DOWN} from '../../util/Constants'
import {connect} from 'react-redux'

class CommentComp extends React.Component {

    static propTypes = {
        comment: PropTypes.object.isRequired
    }

    voteCommentAction = (comment, option) => {
        const {voteForComment} = this.props
        voteForComment(comment.id, option)
    }

    editCommentAction = (comment) => {
        alert(`edit comment ${comment.id}`)
    }

    deleteCommentAction = (comment) => {
        const {deleteComment} = this.props
        deleteComment(comment.id)
    }

    render() {
        const {comment} = this.props

        return (
            <div>
                <div className="flex-style">
                    <textarea className='content-text' defaultValue={comment.body} disabled={true}/>
                    <button className='btn-edit' onClick={() => {
                        this.editCommentAction(comment)
                    }}/>
                    <button className='btn-delete' onClick={() => {
                        this.deleteCommentAction(comment)
                    }}/>
                </div>
                <div className='flex-style'>
                    <button className='btn-vote-up' onClick={() => {
                        this.voteCommentAction(comment, VOTE_UP)
                    }}/>
                    <button className='btn-vote-down' onClick={() => {
                        this.voteCommentAction(comment, VOTE_DOWN)
                    }}/>
                    <div className='meta-infos'>Score {comment.voteScore}</div>
                </div>
                <div className='meta-infos'>
                    Author: {comment.author} / Date: <Time value={comment.timestamp} format='DD.MM.YYYY (HH:mm)'/>
                </div>
                <div className='meta-infos'/>
            </div>
        )
    }
}

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        voteForComment: (commentId, option) => dispatch(voteForComment(commentId, option)),
        deleteComment: (commentId) => dispatch(deleteComment(commentId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentComp)
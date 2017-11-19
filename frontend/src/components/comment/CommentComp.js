import React from 'react'
import PropTypes from 'prop-types'
import Time from 'react-time'
import {voteForComment, deleteComment, editComment} from '../../actions/index'
import {VOTE_UP, VOTE_DOWN} from '../../actions/types'
import {connect} from 'react-redux'
import DialogComp from '../dialog/DialogComp'

class CommentComp extends React.Component {

    static propTypes = {
        comment: PropTypes.object.isRequired
    }

    state = {
        editCommentAuthor: 'Enter Name',
        editCommentBody: 'Enter Body'
    }

    handleFieldChange(field, event) {
        this.setState({[field]: event.target.value});
    }

    voteCommentAction = (comment, option) => {
        const {voteForComment} = this.props
        voteForComment(comment.id, option)
    }

    deleteCommentAction = (comment) => {
        const {deleteComment} = this.props
        deleteComment(comment.id)
    }

    editCommentAction(commentId) {
        const {editComment} = this.props
        const {editCommentAuthor, editCommentBody} = this.state
        editComment(commentId, editCommentAuthor, editCommentBody)
    }

    copyCommentToState(comment) {
        this.setState({editCommentAuthor: comment.author, editCommentBody: comment.body})
    }

    render() {
        const {comment} = this.props

        return (
            <div>
                <div className="flex-style">
                    <textarea className='content-text' value={comment.body} disabled={true}/>
                    <DialogComp className='btn-edit' submitFunction={() => {
                        this.editCommentAction(comment.id)
                    }} submitText='update comment' initFunction={() => {
                        this.copyCommentToState(comment)
                    }}>
                        <div className='category-header'>Edit comment</div>
                        <div className='meta-infos'>Author:</div>
                        <input value={this.state.editCommentAuthor}
                               onChange={event => this.handleFieldChange('editCommentAuthor', event)}/>
                        <div className='meta-infos'>Comment:</div>
                        <textarea className='content-text' value={this.state.editCommentBody}
                                  onChange={event => this.handleFieldChange('editCommentBody', event)}/>
                    </DialogComp>
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
        deleteComment: (commentId) => dispatch(deleteComment(commentId)),
        editComment: (commentId, author, body) => dispatch(editComment(commentId, author, body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentComp)
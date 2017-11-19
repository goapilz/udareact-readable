import React from 'react'
import PropTypes from 'prop-types'
import Time from 'react-time'
import CommentComp from '../comment/CommentComp'
import {voteForPost, reloadCommentsForPost, addCommentForPost, deletePost} from '../../actions/index'
import {VOTE_UP, VOTE_DOWN, SORTING_TYPE_DATE} from '../../util/Constants'
import {connect} from 'react-redux'
import sortBy from 'sort-by'
import DialogComp from '../dialog/DialogComp'

class PostComp extends React.Component {

    static propTypes = {
        post: PropTypes.object.isRequired
    }

    state = {
        editCommentAuthor: 'Enter Name',
        editCommentBody: 'Enter Body'
    }

    componentDidMount() {
        const {reloadCommentsForPost} = this.props
        const {post} = this.props

        // always reload comments for post - will be merged with other comments
        reloadCommentsForPost(post.id)
    }

    votePostAction = (post, option) => {
        const {voteForPost} = this.props
        voteForPost(post.id, option)
    }

    editPostAction = (post) => {
        alert(`edit post ${post.id}`)
    }

    deletePostAction = (post) => {
        const {deletePost} = this.props
        deletePost(post.id)
    }

    handleEditCommentChange(field, event) {
        this.setState({[field]: event.target.value});
    }

    handleEditCommentSubmit() {
        const {addCommentForPost} = this.props
        const {post} = this.props
        const {editCommentAuthor, editCommentBody} = this.state
        addCommentForPost(post.id, editCommentAuthor, editCommentBody)
    }

    render() {
        const {post, comments} = this.props

        const sortedComments = comments.filter(comment => comment.parentId === post.id)
        sortedComments.sort(sortBy(`-${SORTING_TYPE_DATE}`))

        return (
            <div>
                <div className='post-header'>{post.title}</div>
                <div className="flex-style">
                    <textarea className='content-text' defaultValue={post.body} disabled={true}/>
                    <button className='btn-edit' onClick={() => {
                        this.editPostAction(post)
                    }}/>
                    <button className='btn-delete' onClick={() => {
                        this.deletePostAction(post)
                    }}/>
                </div>
                <div className='flex-style'>
                    <button className='btn-vote-up' onClick={() => {
                        this.votePostAction(post, VOTE_UP)
                    }}/>
                    <button className='btn-vote-down' onClick={() => {
                        this.votePostAction(post, VOTE_DOWN)
                    }}/>
                    <div className='meta-infos'>Score {post.voteScore}</div>
                </div>
                <div className='meta-infos'>
                    Author: {post.author} / Date: <Time value={post.timestamp} format='DD.MM.YYYY (HH:mm)'/>
                    &nbsp;/&nbsp;{post.commentCount}&nbsp;comments
                </div>
                <div className='post-header'></div>
                <div className='flex-style'>
                    <div className='post-header'>Comments</div>
                    <DialogComp className='btn-add' submitFunction={() => {
                        this.handleEditCommentSubmit()
                    }} submitText='add comment'>
                        <div className='category-header'>Add comment for post {post.title}</div>
                        <div className='meta-infos'>Author:</div>
                        <input value={this.state.editCommentAuthor}
                               onChange={event => this.handleEditCommentChange('editCommentAuthor', event)}/>
                        <div className='meta-infos'>Content:</div>
                        <textarea className='content-text' value={this.state.editCommentBody}
                                  onChange={event => this.handleEditCommentChange('editCommentBody', event)}/>
                    </DialogComp>
                </div>
                {sortedComments.map((comment) => (
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
        reloadCommentsForPost: (postId) => dispatch(reloadCommentsForPost(postId)),
        addCommentForPost: (postId, author, body) => dispatch(addCommentForPost(postId, author, body)),
        deletePost: (postId) => dispatch(deletePost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostComp)

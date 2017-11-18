import React from 'react'
import PropTypes from 'prop-types'
import Time from 'react-time'
import CommentComp from './CommentComp'
import {voteForPost, reloadCommentsForPost} from '../actions'
import {VOTE_UP, VOTE_DOWN} from '../util/Constants'
import {connect} from 'react-redux'
import sortBy from 'sort-by'

class PostComp extends React.Component {

    static propTypes = {
        post: PropTypes.object.isRequired
    }

    componentDidMount() {
        const {reloadCommentsForPost} = this.props
        const {post} = this.props

        // always reload comments for post - will be merged with other comments
        reloadCommentsForPost(post.id)
    }

    votePost = (post, option) => {
        const {voteForPost} = this.props
        voteForPost(post.id, option)
    }

    addComment = (post) => {
        alert(`add comment for postId ${post.id}`)
    }

    editPost = (post) => {
        alert(`edit post ${post.id}`)
    }

    deletePost = (post) => {
        alert(`delete post ${post.id}`)
    }

    render() {
        const {post, comments} = this.props

        const sortedComments = comments.filter(comment => comment.parentId === post.id)
        sortedComments.sort(sortBy('timestamp'))

        return (
            <div>
                <div className='post-header'>{post.title}</div>
                <textarea className='content-text' defaultValue={post.body}/>
                <button className='btn-edit' onClick={() => {
                    this.editPost(post)
                }}/>
                <button className='btn-delete' onClick={() => {
                    this.deletePost(post)
                }}/>
                <div className='meta-infos'>
                    <button className='btn-vote-up' onClick={() => {
                        this.votePost(post, VOTE_UP)
                    }}/>
                    <button className='btn-vote-down' onClick={() => {
                        this.votePost(post, VOTE_DOWN)
                    }}/>
                    Score {post.voteScore}</div>
                <div className='meta-infos'>
                    Author: {post.author} / Date: <Time value={post.timestamp} format='DD.MM.YYYY'/>
                    / {post.commentCount} comments
                </div>
                <div className='post-header'></div>
                {sortedComments.length > 0 && (<div className='post-header'>Comments
                    <button className='btn-add' style={{left: '10px', bottom: '6px'}} onClick={() => {
                        this.addComment(post)
                    }}/>
                </div>)}
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
        reloadCommentsForPost: (postId) => dispatch(reloadCommentsForPost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostComp)

import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import {Link} from 'react-router-dom'
import {voteForPost, addPostForCategory, deletePost, editPost} from '../../actions/index'
import {SORTING_TYPE_DATE, SORTING_TYPE_SCORE, SORTING_TYPE_COMMENT_COUNT} from "../../actions/types";
import {VOTE_UP, VOTE_DOWN} from '../../actions/types'
import {connect} from 'react-redux'
import Time from 'react-time'
import DialogComp from '../dialog/DialogComp'

class CategoryComp extends React.Component {

    static propTypes = {
        category: PropTypes.object.isRequired,
        posts: PropTypes.array.isRequired
    }

    state = {
        sortingType: SORTING_TYPE_SCORE,
        editPostAuthor: 'Enter Name',
        editPostTitle: 'Enter Title',
        editPostBody: 'Enter Body'
    }

    sort = (sortingType) => {
        this.setState({sortingType})
    }

    votePostAction = (post, option) => {
        const {voteForPost} = this.props
        voteForPost(post.id, option)
    }

    deletePostAction = (post) => {
        const {deletePost} = this.props
        deletePost(post.id)
    }

    handleFieldChange(field, event) {
        this.setState({[field]: event.target.value});
    }

    copyPostToState(post) {
        this.setState({editPostAuthor: post.author, editPostTitle: post.title, editPostBody: post.body})
    }

    addPostAction() {
        const {addPostForCategory} = this.props
        const {category} = this.props
        const {editPostAuthor, editPostTitle, editPostBody} = this.state
        addPostForCategory(category.path, editPostAuthor, editPostTitle, editPostBody)
    }

    editPostAction(postId) {
        const {editPost} = this.props
        const {editPostAuthor, editPostTitle, editPostBody} = this.state
        editPost(postId, editPostAuthor, editPostTitle, editPostBody)
    }

    render() {
        const {category, posts} = this.props
        const {sortingType} = this.state

        const sortedPosts = posts.filter(post => post.category === category.path)
        sortedPosts.sort(sortBy(`-${sortingType}`))

        return (
            <div className='category-block'>
                <div className='category-header'>
                    <Link
                        to={`/category/${category ? category.path : ''}`}>{category ? category.name : ''}</Link>
                    <DialogComp className='btn-add' submitFunction={() => {
                        this.addPostAction()
                    }} submitText='add post'>
                        <div className='category-header'>Add post for category {category.name}</div>
                        <div className='meta-infos'>Author:</div>
                        <input value={this.state.editPostAuthor}
                               onChange={event => this.handleFieldChange('editPostAuthor', event)}/>
                        <div className='meta-infos'>Title:</div>
                        <input value={this.state.editPostTitle}
                               onChange={event => this.handleFieldChange('editPostTitle', event)}/>
                        <div className='meta-infos'>Content:</div>
                        <textarea className='content-text' value={this.state.editPostBody}
                                  onChange={event => this.handleFieldChange('editPostBody', event)}/>
                    </DialogComp>
                    <div className='sorting'>Sorting:
                        <button className='' onClick={() => {
                            this.sort(SORTING_TYPE_DATE)
                        }}>Date
                        </button>
                        <button className='' onClick={() => {
                            this.sort(SORTING_TYPE_SCORE)
                        }}>Score
                        </button>
                        <button className='' onClick={() => {
                            this.sort(SORTING_TYPE_COMMENT_COUNT)
                        }}>Comments
                        </button>
                    </div>
                </div>
                <div>
                    {sortedPosts.map((post) => (
                        <div key={post.id}>
                            <div className="flex-style">
                                <DialogComp className='btn-edit' submitFunction={() => {
                                    this.editPostAction(post.id)
                                }} submitText='update post' initFunction={() => {
                                    this.copyPostToState(post)
                                }}>
                                    <div className='category-header'>Edit post {post.title}</div>
                                    <div className='meta-infos'>Author:</div>
                                    <input value={this.state.editPostAuthor}
                                           onChange={event => this.handleFieldChange('editPostAuthor', event)}/>
                                    <div className='meta-infos'>Title:</div>
                                    <input value={this.state.editPostTitle}
                                           onChange={event => this.handleFieldChange('editPostTitle', event)}/>
                                    <div className='meta-infos'>Content:</div>
                                    <textarea className='content-text' value={this.state.editPostBody}
                                              onChange={event => this.handleFieldChange('editPostBody', event)}/>
                                </DialogComp>
                                <button className='btn-delete' onClick={() => {
                                    this.deletePostAction(post)
                                }}/>
                                <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
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
                            <div className='meta-infos'/>
                        </div>
                    ))}
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
        voteForPost: (postId, option) => dispatch(voteForPost(postId, option)),
        addPostForCategory: (categoryId, author, title, body) => dispatch(addPostForCategory(categoryId, author, title, body)),
        deletePost: (postId) => dispatch(deletePost(postId)),
        editPost: (postId, author, title, body) => dispatch(editPost(postId, author, title, body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComp)
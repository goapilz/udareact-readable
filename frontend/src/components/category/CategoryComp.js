import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import {Link} from 'react-router-dom'
import {voteForPost, addPostForCategory} from '../../actions/index'
import {
    SORTING_TYPE_SCORE,
    SORTING_TYPE_DATE,
    SORTING_TYPE_COMMENT_COUNT,
    VOTE_UP,
    VOTE_DOWN
} from '../../util/Constants'
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

    votePost = (post, option) => {
        const {voteForPost} = this.props
        voteForPost(post.id, option)
    }

    editPost = (post) => {
        alert(`edit post ${post.id}`)
    }

    deletePost = (post) => {
        alert(`delete post ${post.id}`)
    }

    handleEditPostChange(field, event) {
        this.setState({[field]: event.target.value});
    }

    handleEditPostSubmit() {
        const {addPostForCategory} = this.props
        const {category} = this.props
        const {editPostAuthor, editPostTitle, editPostBody} = this.state
        addPostForCategory(category.path, editPostAuthor, editPostTitle, editPostBody)
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
                        this.handleEditPostSubmit()
                    }} submitText='commit comment'>
                        Add post for category {category.name}
                        <div className='meta-infos'>Author:</div>
                        <input value={this.state.editPostAuthor}
                               onChange={event => this.handleEditPostChange('editPostAuthor', event)}/>
                        <div className='meta-infos'>Title:</div>
                        <input value={this.state.editPostTitle}
                               onChange={event => this.handleEditPostChange('editPostTitle', event)}/>
                        <div className='meta-infos'>Content:</div>
                        <textarea className='content-text' value={this.state.editPostBody}
                                  onChange={event => this.handleEditPostChange('editPostBody', event)}/>
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
                                <button className='btn-edit' onClick={() => {
                                    this.editPost(post)
                                }}/>
                                <button className='btn-delete' onClick={() => {
                                    this.deletePost(post)
                                }}/>
                                <Link to={`/post/${post.id}`}>{post.title}</Link>
                            </div>
                            <div className='flex-style'>
                                <button className='btn-vote-up' onClick={() => {
                                    this.votePost(post, VOTE_UP)
                                }}/>
                                <button className='btn-vote-down' onClick={() => {
                                    this.votePost(post, VOTE_DOWN)
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
        addPostForCategory: (categoryId, author, title, body) => dispatch(addPostForCategory(categoryId, author, title, body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComp)
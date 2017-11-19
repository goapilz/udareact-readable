import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import {Link} from 'react-router-dom'
import {voteForPost} from '../actions'
import {SORTING_TYPE_SCORE, SORTING_TYPE_DATE, SORTING_TYPE_COMMENT_COUNT, VOTE_UP, VOTE_DOWN} from '../util/Constants'
import {connect} from 'react-redux'
import Time from 'react-time'
import DialogComp from './dialog/DialogComp'

class CategoryComp extends React.Component {

    static propTypes = {
        category: PropTypes.object.isRequired,
        posts: PropTypes.array.isRequired
    }

    state = {
        sortingType: SORTING_TYPE_SCORE
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
                    <DialogComp className='btn-add'>
                        new post for category: {category.path}
                        <div className='meta-infos'>Author:</div><input value='author'/>
                        <div className='meta-infos'>Title:</div><input value='title'/>
                        <div className='meta-infos'>Content:</div><textarea className='content-text' defaultValue='body'/>
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
                            <button className='btn-edit' onClick={() => {
                                this.editPost(post)
                            }}/>
                            <button className='btn-delete' onClick={() => {
                                this.deletePost(post)
                            }}/>
                            <Link to={`/post/${post.id}`}>{post.title}</Link>

                            <div className='meta-infos'>
                                <button className='btn-vote-up' onClick={() => {
                                    this.votePost(post, VOTE_UP)
                                }}/>
                                <button className='btn-vote-down' onClick={() => {
                                    this.votePost(post, VOTE_DOWN)
                                }}/>
                                Score {post.voteScore}</div>
                            <div className='meta-infos'>
                                Author: {post.author} / Date: <Time value={post.timestamp}
                                                                    format='DD.MM.YYYY'/> / {post.commentCount} comments
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
        voteForPost: (postId, option) => dispatch(voteForPost(postId, option))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComp)
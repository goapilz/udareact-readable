import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import {Link} from 'react-router-dom'
import {voteForPost, voteForComment} from '../actions'
import {connect} from 'react-redux'

class CategoryComp extends React.Component {

    static propTypes = {
        category: PropTypes.object,
        posts: PropTypes.array.isRequired
    }

    state = {
        sortingType: 'voteScore'
    }

    addPost = (category) => {
        alert(`add post for ${category.name}`)
    }

    sort = (sortingType) => {
        this.setState({sortingType})
    }

    votePost = (post, option) => {
        const {voteForPost} = this.props
        voteForPost(post.id, option)
    }

    render() {
        const {category, posts} = this.props
        const {sortingType} = this.state

        const sortedPosts = posts ? posts : [];
        if (sortingType === 'voteScore') {
            sortedPosts.sort(sortBy('voteScore'))
        }
        if (sortingType === 'timestamp') {
            sortedPosts.sort(sortBy('timestamp'))
        }
        if (sortingType === 'commentCount') {
            sortedPosts.sort(sortBy('commentCount'))
        }

        return (
            <div className='category-block'>
                <div className='category-header'>
                    <Link
                        to={`/category/${category ? category.path : ''}`}>{category ? category.name : ''}</Link>
                    <button className='btn-add' onClick={() => {
                        this.addPost(category)
                    }}/>
                    <div className='sorting'>Sorting:
                        <button className='' onClick={() => {
                            this.sort('timestamp')
                        }}>Date
                        </button>
                        <button className='' onClick={() => {
                            this.sort('voteScore')
                        }}>Score
                        </button>
                        <button className='' onClick={() => {
                            this.sort('commentCount')
                        }}>Comments
                        </button>
                    </div>
                </div>
                <div className='posts-block'>
                    {sortedPosts.map((post) => (
                        <div className='post-summary' key={post.id}>
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                            <div>CommentCount:{post.commentCount} Date:{post.timestamp}</div>
                            <div>
                                <button className='btn-vote-up' onClick={() => {
                                    this.votePost(post, 'upVote')
                                }}>vote
                                </button>
                                <button className='btn-vote-down' onClick={() => {
                                    this.votePost(post, 'downVote')
                                }}>vote
                                </button>
                                VoteScore: {post.voteScore}
                            </div>
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
        voteForComment: (commentId, option) => dispatch(voteForComment(commentId, option)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComp)
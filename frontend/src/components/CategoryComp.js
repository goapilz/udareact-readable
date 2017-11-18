import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import {Link} from 'react-router-dom'
import {voteForPost} from '../actions'
import {SORTING_TYPE_SCORE, SORTING_TYPE_DATE, SORTING_TYPE_COMMENT_COUNT, VOTE_UP, VOTE_DOWN} from '../util/Constants'
import {connect} from 'react-redux'
import Time from 'react-time'

class CategoryComp extends React.Component {

    static propTypes = {
        category: PropTypes.object.isRequired,
        posts: PropTypes.array.isRequired
    }

    state = {
        sortingType: SORTING_TYPE_SCORE
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

        const sortedPosts = posts.filter(post => post.category === category.path)
        sortedPosts.sort(sortBy(sortingType))

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
                <div className='posts-block'>
                    {sortedPosts.map((post) => (
                        <div className='post-summary' key={post.id}>
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
                                Date: <Time value={post.timestamp} format='YYYY/MM/DD'/> {post.commentCount} comments
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
        voteForPost: (postId, option) => dispatch(voteForPost(postId, option))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryComp)
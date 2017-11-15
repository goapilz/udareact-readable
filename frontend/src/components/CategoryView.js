import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import {Link} from 'react-router-dom'

class CategoryView extends React.Component {
    static propTypes = {
        category: PropTypes.string.isRequired,
        postsPerCategory: PropTypes.array.isRequired
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
    render () {
        const {category, postsPerCategory} = this.props

        // get category Object from store
        const {sortingType} = this.state

        const sortedPosts = postsPerCategory ? postsPerCategory : [];
        
        if (sortingType === 'voteScore') {
            sortedPosts.sort(sortBy('voteScore'))
        } if (sortingType === 'timestamp') { 
            sortedPosts.sort(sortBy('timestamp'))
        } if (sortingType === 'commentCount') { 
            sortedPosts.sort(sortBy('commentCount'))
        }
        
        // <Link to='/post' className='add-post'/> 

        return (
            <div className='category-column'>
                <Link className='category-header' to={`/category/${category.path}`}>{category.name}</Link>
                <div>Sorting:
                    <button className='' onClick={() => {this.sort('timestamp')}}>Date</button>
                    <button className='' onClick={() => {this.sort('voteScore')}}>Score</button>
                    <button className='' onClick={() => {this.sort('commentCount')}}>Comments</button>
                </div>
                <div className='post-column'>
                    {sortedPosts.map((post) => (
                        <div className='post' key={post.id}>
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                            <div className='postData'>Score:{post.voteScore} Comments:{post.commentCount} Date:{post.timestamp}</div>
                        </div>
                    ))}  
                </div>
                <button className='add-post' onClick={() => {this.addPost(category)}}/>
            </div>
        )
    }
}

export default CategoryView
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './../css/App.css'
import {reloadCategories, reloadPosts} from '../actions'
import {connect} from 'react-redux';
import FaRefresh from 'react-icons/lib/fa/refresh'

class App extends Component {

    state = {
        sortorder: 'name'
    }

    componentDidMount() {
        const {reloadCategories, reloadPosts} = this.props
        reloadCategories()
        reloadPosts()
        // reloadCommentsForPost('8xf0y6ziyjabvozdd253nd')
    }


    render() {
        const {reloadCategories, reloadPosts} = this.props
        const {categories, posts} = this.props // not state ?

        // {JSON.stringify(commentsForPost)}
        // <div>posts: {JSON.stringify(posts)}</div>

        return (
            <div>
                <button onClick={() => {
                    reloadCategories()
                    reloadPosts()
                }} className='icon-btn'>
                    <FaRefresh size={30}/>
                </button>

                <ul className='categories'>
                    {categories.map((category) => (
                        <li className="category" key={category.name}>
                            <Link to={`/category/${category.path}`} className='open-category'>{category.name}</Link>
                        </li>
                    ))}
                </ul>

                <ul className='categories'>
                    {categories.map((category) => (
                        <li className="" key={category.name}>
                            <div>
                                {posts.filter(postWithCategory => postWithCategory.category === category.name)[0].posts.map((postValue) => (
                                    <div key={postValue.id}>{postValue.title}</div>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({categories, posts}) {
    return {
        categories,
        posts: categories.map((categoryValue) => ({
            category: categoryValue.name,
            posts: posts.filter(post => post.category === categoryValue.name)
        }))
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reloadCategories: () => dispatch(reloadCategories()),
        reloadPosts: () => dispatch(reloadPosts()),
        // reloadCommentsForPost: (postId) => dispatch(reloadCommentsForPost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

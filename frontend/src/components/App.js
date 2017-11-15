import React, {Component} from 'react'
import {Link, Route} from 'react-router-dom'
import './../css/App.css'
import {reloadCategories, reloadPosts} from '../actions'
import {connect} from 'react-redux';
import FaRefresh from 'react-icons/lib/fa/refresh'
import CategoryView from './CategoryView'

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

    getCategory (categories, categoryId) {
        return categories.find(x => x.path ===categoryId)
     }  

    render() {
        const {reloadCategories, reloadPosts} = this.props
        const {categories, posts} = this.props // not state ?

        // {JSON.stringify(commentsForPost)}
        // <div>posts: {JSON.stringify(posts)}</div>

        // use routes with components https://github.com/reactjs/react-router-tutorial/tree/master/lessons/06-params

        return (
            <div>
                <button onClick={() => {
                    reloadCategories()
                    reloadPosts()
                }} className='icon-btn'>
                    <FaRefresh size={30}/>
                </button>
                <Route exact path='/' render={()=> (
                    <div>
                    {categories.map((category) => (
                        <CategoryView key={category.path} category={category} postsPerCategory={posts.find(postWithCategory => postWithCategory.category === category.path).posts} sortingType={'voteScore'}/>
                    ))}
                    </div>
                )}/> 
                <Route path='/category/:categoryId' render={(match) => (
                    this.getCategory(categories, match.params.categoryId) ? 
                   <CategoryView category={this.getCategory(categories, match.params.categoryId)} 
                        postsPerCategory={posts.find(postWithCategory => postWithCategory.category === 'redux')} sortingType={'voteScore'}/>
                        :
                        <div></div>
                )}/>
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

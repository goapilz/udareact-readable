import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as ReadableAPI from './../util/ReadableAPI'
import './../css/App.css'
import {reload, fetchCategories} from '../actions'
import {connect} from 'react-redux';
import FaRefresh from 'react-icons/lib/fa/refresh'

class App extends Component {

    /*state = {
        categories: [],
        posts: [],
        comments: []
    }*/

    componentDidMount() {
        ReadableAPI.getAllCategories().then((data) => {
            console.log(data)
            const {reload} = this.props
            reload({categories:data, posts: [], comments: []})
        })
        ReadableAPI.getAllPosts().then((data) => {
            console.log(data)
            const {reload} = this.props
            reload({categories:[], posts:data, comments: []})
        })
        /*        ReadableAPI.getAllComments('8xf0y6ziyjabvozdd253nd').then((data) => {
                    reloadComments({comments:data})
                })*/
    }


    render() {
        const {fetchCategories} = this.props
        const {categories, posts,comments} = this.props // not state ?
        
        // {JSON.stringify(this.state.backend)}
        return (
            <div className="category-overview">
                {categories.map((category) => (
                    <div className="category" key={category.name}>
                        <Link to={`/category/${category.path}`} className='open-category'>{category.name}</Link>
                    </div>
                ))}
                <div>posts: {JSON.stringify(posts)}</div>
                <div>comments(8xf0y6ziyjabvozdd253nd): {JSON.stringify(comments)}</div>
                <button onClick={() => fetchCategories()}
                        className='icon-btn'>
                    <FaRefresh size={30}/>
                </button>
            </div>
        )
    }
}

function mapStateToProps({categories, posts, comments}) {
    return {
        categories,
        posts,
        comments
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reloadAll: () => dispatch(reload({categories: [{name: 'redux', path: 'reduxPath'},{name: 'react', path: 'reactPath'}], posts: [], comments: []})),
        reloadAllAsync: () => dispatch(reload({categories: [{name: 'redux', path: 'reduxPath'},{name: 'react', path: 'reactPath'}], posts: [], comments: []})),
        reload: (data) => dispatch(reload(data)),
        fetchCategories: () => dispatch(fetchCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

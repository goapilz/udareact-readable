import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as ReadableAPI from './../util/ReadableAPI'
import './../css/App.css'
import {reload} from '../actions'
import {connect} from 'react-redux';
import FaRefresh from 'react-icons/lib/fa/refresh'

class App extends Component {

    /*state = {
        categories: [],
        posts: [],
        comments: []
    }*/

    render() {
        const {reload} = this.props
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
                <button onClick={() => reload({categories: [{name: 'redux', path: 'reduxPath'}], posts: [], comments: []})}
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
        reload: (data) => dispatch(reload(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

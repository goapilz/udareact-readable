import React, {Component} from 'react'
import '../css/app.css'
import CategoryView from './category/CategoryView'
import MainView from './main/MainView'
import PostView from './post/PostView'
import {Route, withRouter} from 'react-router-dom'

class App extends Component {

    render() {
        return (
            <div className="app">
                <Route exact path='/' component={MainView}/>
                <Route path='/category/:categoryId' component={CategoryView}/>
                <Route path='/post/:postId' component={PostView}/>
                <Route path='/:categoryId/:postId' component={PostView}/>
            </div>
        )
    }
}

export default withRouter(App);
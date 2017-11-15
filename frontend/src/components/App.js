import React, {Component} from 'react'
import './../css/App.css'
import CategoryView from './CategoryView'
import RootView from './RootView'
import PostView from './PostView'
import {Route, withRouter} from 'react-router-dom'

class App extends Component {

    render() {
        return (
            <div>
                <Route exact path='/' component={RootView}/>
                <Route path='/category/:categoryId' component={CategoryView}/>
                <Route path='/post/:postId' component={PostView}/>
            </div>
        )
    }
}

export default withRouter(App);
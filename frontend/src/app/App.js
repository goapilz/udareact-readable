import React, {Component} from 'react'
import '../css/app.css'
import CategoryView from '../views/CategoryView'
import MainView from '../views/MainView'
import PostView from '../views/PostView'
import {Route, withRouter} from 'react-router-dom'

class App extends Component {

    render() {
        return (
            <div className="app">
                <Route exact path='/' component={MainView}/>
                <Route path='/category/:categoryId' component={CategoryView}/>
                <Route path='/post/:postId' component={PostView}/>
            </div>
        )
    }
}

export default withRouter(App);
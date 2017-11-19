import React, {Component} from 'react'
import '../css/app.css'
import CategoryView from './category/CategoryView'
import MainView from './main/MainView'
import PostView from './post/PostView'
import {Route, Switch, withRouter} from 'react-router-dom'

class App extends Component {

    render() {
        return (
            <div className="app">
                <Switch>
                    <Route exact path='/' component={MainView}/>
                    <Route path='/category/:categoryId' component={CategoryView}/>
                    <Route path='/:categoryId/:postId' component={PostView}/>
                </Switch>
            </div>
        )
    }
}

export default withRouter(App)
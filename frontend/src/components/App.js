import React, {Component} from 'react'
import '../css/app.css'
import CategoryView from './CategoryView'
import RootView from './RootView'
import PostView from './PostView'
import Modal from 'react-modal'
import {Route, withRouter} from 'react-router-dom'

class App extends Component {

    state = {
        addPostDialogOpen: false
    }

    closeAddPostDialogOpen = () => {
        this.setState({addPostDialogOpen: false})
    }

    render() {
        const {addPostDialogOpen} = this.state
        return (
            <div className="app">
                <Route exact path='/' component={RootView}/>
                <Route path='/category/:categoryId' component={CategoryView}/>
                <Route path='/post/:postId' component={PostView}/>
                <button
                    className='icon-btn'
                    onClick={() => {
                        this.setState({addPostDialogOpen: true})
                    }}>display dialog
                </button>
                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={addPostDialogOpen}
                    onRequestClose={this.closeAddPostDialogOpen}
                    contentLabel='Modal'>
                    <div>my dialog</div>
                    <button
                        className='icon-btn'
                        onClick={this.closeAddPostDialogOpen}>close
                    </button>
                </Modal>
            </div>
        )
    }
}

export default withRouter(App);
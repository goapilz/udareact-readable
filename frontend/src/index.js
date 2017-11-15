import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import './css/index.css'
import App from './components/App'
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker'


const store = configureStore();

console.log(store.getState())

ReactDOM.render(
    <BrowserRouter><Provider store={store}>
        <App/>
    </Provider></BrowserRouter>, document.getElementById('root'))

registerServiceWorker()
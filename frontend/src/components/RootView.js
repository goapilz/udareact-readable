import React from 'react'
import PropTypes from 'prop-types'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'


class RootView extends React.Component {

    render () {
        return (
            <div><div>Root</div><Link to={`/category/react`}>React</Link> <Link to={`/category/redux`}>Redux</Link> <Link to={`/category/test`}>Test</Link></div>
        )
    }
}

export default RootView

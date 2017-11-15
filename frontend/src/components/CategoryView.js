import React from 'react'
import PropTypes from 'prop-types'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

class CategoryView extends React.Component {

    render () {
        return (
            <div>Category: {this.props.match.params.categoryId} <Link to={'/'}>Root</Link></div>
        )
    }
}

export default CategoryView

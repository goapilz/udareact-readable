import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {reloadCategories, reloadPostsForCategory} from '../actions'
import CategoryComp from './CategoryComp'

class CategoryView extends React.Component {

    componentDidMount() {
        console.log("componentDidMount CategoryView")

        const {reloadCategories, reloadPostsForCategory, categories} = this.props
        const {categoryId} = this.props.match.params

        if (categories.length === 0) {
            // reload only if needed
            reloadCategories()
        }
        // always reload
        reloadPostsForCategory(categoryId)
    }

    render() {
        console.log("render CategoryView")
        const {categories, posts} = this.props
        const {categoryId} = this.props.match.params

        const category = categories.find(value => value.path === categoryId)

        return (
            <div>
                <CategoryComp category={category}
                              posts={posts}
                              sortingType={'voteScore'}/>
                <Link to={'/'}>Overview</Link>
            </div>
        )
    }
}

function mapStateToProps({categories, posts}) {
    return {
        categories,
        posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reloadCategories: () => dispatch(reloadCategories()),
        reloadPostsForCategory: (categoryId) => dispatch(reloadPostsForCategory(categoryId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView)


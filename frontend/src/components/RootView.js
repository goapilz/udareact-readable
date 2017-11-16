import React from 'react'
import {connect} from 'react-redux'
import {reloadCategories, reloadPosts} from '../actions'
import CategoryComp from './CategoryComp'


class RootView extends React.Component {

    componentDidMount() {
        const {reloadCategories, reloadPosts, categories} = this.props
        if (categories.length === 0) {
            // reload only if needed
            reloadCategories()
        }
        // always reload
        reloadPosts()
    }

    render () {
        const {categories, posts} = this.props
        return (
            <div>
                {categories.map((category) => (
                    <CategoryComp key={category.path} category={category}
                                  posts={posts.filter(post => post.category === category.path)}
                                  sortingType={'voteScore'}/>
                ))}
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
        reloadPosts: () => dispatch(reloadPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootView)

import React from 'react'
import {connect} from 'react-redux'
import {reloadCategories, reloadPosts} from '../actions'
import CategoryComp from './CategoryComp'


class RootView extends React.Component {

    componentDidMount() {
        const {reloadCategories, reloadPosts} = this.props
        reloadCategories()
        reloadPosts()
    }

    render () {
        const {categories, posts} = this.props
        return (
            <div>
                {categories.map((category) => (
                    <CategoryComp key={category.path} category={category}
                                  posts={posts.find(postWithCategory => postWithCategory.category === category.path).posts}
                                  sortingType={'voteScore'}/>
                ))}
            </div>
        )
    }
}

function mapStateToProps({categories, posts}) {
    return {
        categories,
        posts: categories.map((categoryValue) => ({
            category: categoryValue.name,
            posts: posts.filter(post => post.category === categoryValue.name)
        }))
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reloadCategories: () => dispatch(reloadCategories()),
        reloadPosts: () => dispatch(reloadPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootView)

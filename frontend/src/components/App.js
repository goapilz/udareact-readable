import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as ReadableAPI from './../util/ReadableAPI'
import './../css/App.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        ReadableAPI.getAllCategories().then((data) => {
            console.log('data', data)
            this.setState({categories:data});
        })
    }

    render() {
        const {categories} = this.state
        console.log('categories', categories)
        // {JSON.stringify(this.state.backend)}
        return (
            <div className="category-overview">
                {categories.map((category) => (
                    <div className="category" key={category.name}>
                        <Link to={`/category/${category.name}`} className='open-category'>{category.name}</Link>
                    </div>
                ))}
            </div>
        )
    }
}

export default App

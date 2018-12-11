import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPostIfNeeded, refresh } from './actions'
import Search from './components/Search'
import Posts from './components/Posts'

class App extends Component {
    componentDidUpdate() {
        const { searchValue, fetchPostIfNeeded } = this.props
        fetchPostIfNeeded(searchValue)
    }
    
    handleRefresh = e => {
        const { fetchPostIfNeeded, searchValue, refresh } = this.props
        e.preventDefault()
        refresh(searchValue)
        fetchPostIfNeeded(searchValue)
    }
    render() {
        const { posts, isFetching } = this.props
        const isEmty = posts.length === 0
        return (
            <div>
                <h1>Search</h1>
                {/* Search*/}
                <Search handleRefresh={this.handleRefresh}/>
                {/* posts*/}
                {isEmty ?
                    isFetching ? <h2>loading...</h2> : <h2>empty...</h2>
                    : <div style={{opacity : isFetching ? 0.5 : 1}}>
                        <Posts posts={posts}/>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { searchValue, postsByValue } = state
    const {
        isFetching,
        invalidate,
        posts
    } = postsByValue[searchValue] || {
        isFetching: false,
        invalidate: false,
        posts: []
    }
    return {
        searchValue,
        isFetching,
        invalidate,
        posts
    }
}

export default connect(mapStateToProps, { fetchPostIfNeeded, refresh })(App)
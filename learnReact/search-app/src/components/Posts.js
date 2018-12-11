import React, { Component } from 'react'

export default class Posts extends Component {
    renderChild = (item, id) => <li key={id}>{item.title}</li>
    render() {
        const { posts } = this.props
        return (
            <ul>
                {posts.map(this.renderChild)}
            </ul>
        )
    }
}


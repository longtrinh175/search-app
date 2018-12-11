import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSearchValue} from '../actions'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = { value: "" }
    }

    handleChange = e => {
        this.setState({ value: e.target.value})
    }

    handleSubmit = e => {
        const { setSearchValue } = this.props
        const { value } = this.state
        e.preventDefault()
        if (!value.trim()) {
            return
        }
        setSearchValue(value.trim())
        this.setState({ value: "" })
    }

    render() {
        const { value } = this.state
        const { handleRefresh } = this.props
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={value} onChange={this.handleChange} placeholder="nhap thong tin ..."/>
                <button type="submit"><span className="fa fa-search"></span></button>
                <button onClick={handleRefresh}><span className="fa fa-sync-alt"></span></button>
            </form>
        )
    }
}

export default connect(null, { setSearchValue }) (Search)
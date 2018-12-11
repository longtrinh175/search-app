import { combineReducers } from 'redux'
import { SET_SEARCH_VALUE, REFRESH, REQUETS, RECEIVE } from '../constants/actionTypes'

const searchValue = (state = "", action) => {
    if (action.type === SET_SEARCH_VALUE) {
        return action.searchValue
    }
    return state
}

const posts = (state = {
    isFetching: false,
    invalidate: false,
    posts: []
}, action) => {
    switch (action.type) {
        case REFRESH:
            return {
                ...state,
                invalidate: true
            }
        case REQUETS:
            return {
                ...state,
                invalidate: false,
                isFetching: true
            }
        case RECEIVE:
            return {
                ...state,
                posts: action.posts,
                invalidate: false,
                isFetching: false
            }
        default:
            return state
    }
}

const postsByValue = (state = {}, action) => {
    switch (action.type) {
        case REFRESH:
        case REQUETS:
        case RECEIVE:  
            return {
                ...state,
                [action.searchValue]: posts(state[action.searchValue], action)
            }  
        default:
            return state
    }
}

export default combineReducers({
    searchValue,
    postsByValue
})
import { SET_SEARCH_VALUE, REQUETS, RECEIVE, REFRESH } from '../constants/actionTypes'

export const setSearchValue = searchValue => ({
    type: SET_SEARCH_VALUE,
    searchValue
})

export const refresh = searchValue => ({
    type: REFRESH, 
    searchValue
})

const request = searchValue => ({
    type: REQUETS,
    searchValue
})

const receive = (searchValue, json) => ({
    type: RECEIVE,
    searchValue,
    posts: json.data.children.map(child => child.data)
})

const fetchPost = searchValue => dispatch => {
    dispatch(request(searchValue))
    return fetch(`https://www.reddit.com/r/${searchValue}.json`)
        .then(response =>  response.json())
        .then(json => dispatch(receive(searchValue, json)))
}

const shouldFetch = (state, searchValue) => {
    const posts = state.postsByValue[searchValue]
    if (!posts) {
        return true
    }
    if (posts.isFetching) {
        return false
    }
    return posts.invalidate
}

export const fetchPostIfNeeded = searchValue => (dispatch, getState) => {
    if (shouldFetch(getState(), searchValue)) {
        return dispatch(fetchPost(searchValue))
    }
}
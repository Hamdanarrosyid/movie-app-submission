import {STORE_LOAD_MORE, LOAD_MORE_MOVIE, STORE_MOVIE, STORE_SEARCH_PARAM, STORE_SEARCH_RESULT } from "./actionType";

const initialState = {
    searchParam: '',
    movies: {
        data: [],
        totalResults: 0
    },
    movie: {},
    loadMore: {
        completeLoad: false,
        beingLoad: false
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_SEARCH_PARAM:
            return {
                ...state,
                searchParam: action.payload
            }
        case STORE_SEARCH_RESULT:
            return {
                ...state,
                movies: {
                    data: action.payload.data,
                    totalResults: action.payload.totalResults
                }
            }
        case STORE_LOAD_MORE:
            return {
                ...state,
                movies: {
                    data: [...state.movies.data, ...action.payload.data],
                    totalResults: action.payload.totalResults
                }
            }

        case STORE_MOVIE:
            return {
                ...state,
                movie: action.payload
            }
        case LOAD_MORE_MOVIE:
            return {
                ...state,
                loadMore: {
                    ...state.loadMore,
                    ...action.payload
                }
            }
        default:
            break;
    }
}

export default reducer
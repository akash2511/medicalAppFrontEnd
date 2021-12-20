import {
    APP_LOGOUT,
    COVID_GRAPH_FETCH_START,
    COVID_GRAPH_DATA,
    COVID_GRAPH_FETCH_FAIL
} from '../actions'

const initialState = {
    isLoading: false,
    isErr: false,
    errMsg: '',
    covidGraph: {},
    successMsg: ''
}

export const graph = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOGOUT:
            return initialState
        case COVID_GRAPH_FETCH_START:
            return Object.assign({}, state, {
                isLoading: true,
                isErr: false,
                errMsg: '',
                successMsg: ''
            })
        case COVID_GRAPH_FETCH_FAIL:
            return Object.assign({}, state, {
                isLoading: false,
                isErr: true,
                errMsg: action.errMsg,
                successMsg: ''
            })
        case COVID_GRAPH_DATA:
            return Object.assign({}, state, {
                isLoading: false,
                covidGraph: action.data,
                successMsg: '',
                isErr: false,
            })
        default:
            return state
    }
}

export const getIsCovidGraphLoading = state => state.graph.isLoading
export const getCovidGraph = state => state.graph.covidGraph
export const getIsErr = state => state.graph.isErr
export const getSuccessMsg = state => state.graph.successMsg

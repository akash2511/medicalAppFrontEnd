import {
    APP_LOGOUT,
    SUPPLEMENTS_FETCH_START,
    SUPPLEMENTS_DATA,
    SUPPLEMENTS_FETCH_FAIL
} from '../actions'

const initialState = {
    isLoading: false,
    isErr: false,
    errMsg: '',
    allSupplements: [],
    successMsg: ''
}

export const supplements = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOGOUT:
            return initialState
        case SUPPLEMENTS_FETCH_START:
            return Object.assign({}, state, {
                isLoading: true,
                isErr: false,
                errMsg: '',
                successMsg: ''
            })
        case SUPPLEMENTS_FETCH_FAIL:
            return Object.assign({}, state, {
                isLoading: false,
                isErr: true,
                errMsg: action.errMsg,
                successMsg: ''
            })
        case SUPPLEMENTS_DATA:
            return Object.assign({}, state, {
                isLoading: false,
                allSupplements: action.data,
                successMsg: ''
            })
        default:
            return state
    }
}

export const isSupplementsLoading = state => state.supplements.isLoading
export const geSupplements = state => state.supplements.allSupplements
export const getSuccessMsg = state => state.supplements.successMsg

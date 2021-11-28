import {
    APP_LOGOUT,
    EMR_FETCH_START,
    EMR_DATA,
    EMR_FETCH_FAIL
} from '../actions'

const initialState = {
    isLoading: false,
    isErr: false,
    errMsg: '',
    allEmrs: [],
    successMsg: ''
}

export const emr = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOGOUT:
            return initialState
        case EMR_FETCH_START:
            return Object.assign({}, state, {
                isLoading: true,
                isErr: false,
                errMsg: '',
                successMsg: ''
            })
        case EMR_FETCH_FAIL:
            return Object.assign({}, state, {
                isLoading: false,
                isErr: true,
                errMsg: action.errMsg,
                successMsg: ''
            })
        case EMR_DATA:
            return Object.assign({}, state, {
                isLoading: false,
                allEmrs: action.data,
                successMsg: '',
                isErr: false,
            })
        default:
            return state
    }
}

export const getIsEmrLoading = state => state.emr.isLoading
export const getAllEmrs = state => state.emr.allEmrs
export const getSuccessMsg = state => state.emr.successMsg

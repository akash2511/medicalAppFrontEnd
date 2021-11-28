import {
    APP_LOGOUT,
    PRESCRIPTION_FETCH_START,
    PRESCRIPTION_DATA,
    PRESCRIPTION_FETCH_FAIL
} from '../actions'

const initialState = {
    isLoading: false,
    isErr: false,
    errMsg: '',
    successMsg: ''
}

export const prescription = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOGOUT:
            return initialState
        case PRESCRIPTION_FETCH_START:
            return Object.assign({}, state, {
                isLoading: true,
                isErr: false,
                errMsg: '',
                successMsg: ''
            })
        case PRESCRIPTION_FETCH_FAIL:
            return Object.assign({}, state, {
                isLoading: false,
                isErr: true,
                errMsg: action.errMsg,
                successMsg: ''
            })
        case PRESCRIPTION_DATA:
            return Object.assign({}, state, {
                isLoading: false,
                successMsg: '',
                isErr: false
            })
        default:
            return state
    }
}

export const getIsPrescriptionLoading = state => state.prescription.isLoading
export const getSuccessMsg = state => state.prescription.successMsg

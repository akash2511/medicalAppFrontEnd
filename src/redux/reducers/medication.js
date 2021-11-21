import {
    APP_LOGOUT,
    MEDICATIONS_FETCH_START,
    MEDICATIONS_DATA,
    MEDICATIONS_FETCH_FAIL
} from '../actions'

const initialState = {
    isLoading: false,
    isErr: false,
    errMsg: '',
    allMedications: [],
    successMsg: ''
}

export const medications = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOGOUT:
            return initialState
        case MEDICATIONS_FETCH_START:
            return Object.assign({}, state, {
                isLoading: true,
                isErr: false,
                errMsg: '',
                successMsg: ''
            })
        case MEDICATIONS_FETCH_FAIL:
            return Object.assign({}, state, {
                isLoading: false,
                isErr: true,
                errMsg: action.errMsg,
                successMsg: ''
            })
        case MEDICATIONS_DATA:
            return Object.assign({}, state, {
                isLoading: false,
                allMedications: action.data,
                successMsg: ''
            })
        default:
            return state
    }
}

export const getIsMedicationsLoading = state => state.medications.isLoading
export const geMedications = state => state.medications.allMedications
export const getSuccessMsg = state => state.medications.successMsg

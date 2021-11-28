import {
    APP_LOGOUT,
    PATIENT_FETCH_START,
    PATIENT_DATA,
    PATIENT_FETCH_FAIL
} from '../actions'

const initialState = {
    isLoading: false,
    isErr: false,
    errMsg: '',
    allDoctorPatients: [],
    successMsg: ''
}

export const doctor = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOGOUT:
            return initialState
        case PATIENT_FETCH_START:
            return Object.assign({}, state, {
                isLoading: true,
                isErr: false,
                errMsg: '',
                successMsg: ''
            })
        case PATIENT_FETCH_FAIL:
            return Object.assign({}, state, {
                isLoading: false,
                isErr: true,
                errMsg: action.errMsg,
                successMsg: ''
            })
        case PATIENT_DATA:
            return Object.assign({}, state, {
                isLoading: false,
                allDoctorPatients: action.data,
                successMsg: '',
                isErr: false,
            })
        default:
            return state
    }
}

export const getIsPatientsLoading = state => state.doctor.isLoading
export const getAllDoctorPatients = state => state.doctor.allDoctorPatients
export const getSuccessMsg = state => state.doctor.successMsg

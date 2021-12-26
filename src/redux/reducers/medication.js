import {
    APP_LOGOUT,
    MEDICATIONS_FETCH_START,
    MEDICATIONS_DATA,
    MEDICATIONS_FETCH_FAIL,
    PATIENT_MEDICATIONS_FETCH_START,
    PATIENT_MEDICATIONS_DATA,
    PATIENT_MEDICATIONS_FETCH_FAIL
} from '../actions'

const initialState = {
    isLoading: false,
    isErr: false,
    errMsg: '',
    allMedications: [],
    successMsg: '',
    isLoadingPutPatientMedication: false,
    allPatientMedication:{}
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
        case PATIENT_MEDICATIONS_FETCH_START:
            return Object.assign({}, state, {
                isLoadingPutPatientMedication: true,
                isErr: false,
                errMsg: '',
                successMsg: ''
            })
        case PATIENT_MEDICATIONS_FETCH_FAIL:
            return Object.assign({}, state, {
                isLoadingPutPatientMedication: false,
                isErr: true,
                errMsg: action.errMsg,
                successMsg: ''
            })
        case PATIENT_MEDICATIONS_DATA:
            return Object.assign({}, state, {
                isLoadingPutPatientMedication: false,
                allPatientMedication: action.data,
                successMsg: '',
                isErr: false,
            })
        default:
            return state
    }
}

export const getIsMedicationsLoading = state => state.medications.isLoading
export const getIsLoadingPutPatientMedication = state => state.medications.isLoadingPutPatientMedication
export const geMedications = state => state.medications.allMedications
export const getSuccessMsg = state => state.medications.successMsg
export const getIsErr = state => state.medications.isErr

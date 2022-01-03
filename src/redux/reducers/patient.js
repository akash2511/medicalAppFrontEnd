import {
    APP_LOGOUT,
    PATIENT_MEAL_START,
    PATIENT_MEAL_DATA,
    PATIENT_MEAL_FAIL,
    PATIENT_SELF_MANAGEMENT_START,
    PATIENT_SELF_MANAGEMENT_FAIL,
    PATIENT_SELF_MANAGEMENT_DATA,
    PATIENT_MEDICATION_START,
    PATIENT_MEDICATION_DATA,
    PATIENT_MEDICATION_FAIL,
} from '../actions'

const initialState = {
    isLoadingPatientMeal: false,
    isLoadingPatientSelfManagement: false,
    isErr: false,
    errMsg: '',
    patientMeal: {},
    patientSelfManagement: {},
    successMsg: '',
    isLoadingPatientMedication:false,
    patientMedication:{}
}

export const patient = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOGOUT:
            return initialState
        case PATIENT_MEAL_START:
            return Object.assign({}, state, {
                isLoadingPatientMeal: true,
                isErr: false,
                errMsg: '',
                successMsg: ''
            })
        case PATIENT_MEAL_FAIL:
            return Object.assign({}, state, {
                isLoadingPatientMeal: false,
                isErr: true,
                errMsg: action.errMsg,
                successMsg: ''
            })
        case PATIENT_MEAL_DATA:
            return Object.assign({}, state, {
                isLoadingPatientMeal: false,
                patientMeal: action.data,
                successMsg: '',
                isErr: false,
            })
        case PATIENT_SELF_MANAGEMENT_START:
            return Object.assign({}, state, {
                isLoadingPatientSelfManagement: true,
                isErr: false,
                errMsg: '',
                successMsg: ''
            })
        case PATIENT_SELF_MANAGEMENT_FAIL:
            return Object.assign({}, state, {
                isLoadingPatientSelfManagement: false,
                isErr: true,
                errMsg: action.errMsg,
                successMsg: ''
            })
        case PATIENT_SELF_MANAGEMENT_DATA:
            return Object.assign({}, state, {
                isLoadingPatientSelfManagement: false,
                patientSelfManagement: action.data,
                successMsg: '',
                isErr: false,
            })
        case PATIENT_MEDICATION_START:
            return Object.assign({}, state, {
                isLoadingPatientMedication: true,
                isErr: false,
                errMsg: '',
                successMsg: ''
            })
        case PATIENT_MEDICATION_FAIL:
            return Object.assign({}, state, {
                isLoadingPatientMedication: false,
                isErr: true,
                errMsg: action.errMsg,
                successMsg: ''
            })
        case PATIENT_MEDICATION_DATA:
            return Object.assign({}, state, {
                isLoadingPatientMedication: false,
                patientMedication: action.data,
                successMsg: '',
                isErr: false,
            })
        default:
            return state
    }
}

export const getIsLoadingPatientMeal = state => state.patient.isLoadingPatientMeal
export const getIsLoadingPatientSelfManagement = state => state.patient.isLoadingPatientSelfManagement
export const getIsLoadingPatientMedication = state => state.patient.isLoadingPatientMedication
export const getPatientMedication = state => state.patient.patientMedication
export const getPatientMeal = state => state.patient.patientMeal
export const getPatientSelfManagement = state => state.patient.patientSelfManagement
export const getSuccessMsg = state => state.patient.successMsg

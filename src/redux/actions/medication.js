import {
    MEDICATIONS_FETCH_START,
    MEDICATIONS_DATA,
    MEDICATIONS_FETCH_FAIL,
    PATIENT_MEDICATIONS_FETCH_START,
    PATIENT_MEDICATIONS_DATA,
    PATIENT_MEDICATIONS_FETCH_FAIL
} from '../actions.js'

import { checkStatus, backendUrl, composeAuth } from '../../helpers/utils'

// get requests

const emitStart = () => ({
    type: MEDICATIONS_FETCH_START
})

const emitFail = errMsg => ({
    type: MEDICATIONS_FETCH_FAIL,
    errMsg
})

const emitMedicationsData = data => {
    return {
        type: MEDICATIONS_DATA,
        data
    }
}

// fetch medications 
export const startFetchMedications = (data) => {
    return async (dispatch) => {
        dispatch(emitStart())
        try {
            const receivedData = await fetchMedications(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitMedicationsData(response?.data))
        } catch (err) {
            dispatch(emitFail())
        }
    }
}

const fetchMedications = ({jwt}) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + '/api/medication'
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        }
    })
}

// put patient medication
const emitPutPatientMedicationStart = () => ({
    type: PATIENT_MEDICATIONS_FETCH_START
})

const emitPutPatientMedicationFail = errMsg => ({
    type: PATIENT_MEDICATIONS_FETCH_FAIL,
    errMsg
})

const emitPutPatientMedicationData = data => {
    return {
        type: PATIENT_MEDICATIONS_DATA,
        data
    }
}

// edit patient medications 
export const startEditPatientMedication = (data) => {
    return async (dispatch) => {
        dispatch(emitPutPatientMedicationStart())
        try {
            const receivedData = await editPatientMedication(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitPutPatientMedicationData(response?.data))
        } catch (err) {
            dispatch(emitPutPatientMedicationFail())
        }
    }
}

const editPatientMedication = ({jwt, data, id}) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + `/api/patients-medication/${id}`
    return fetch(url, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        },
        body:JSON.stringify(data)
    })
}
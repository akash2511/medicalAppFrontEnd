import {
    PATIENT_FETCH_START,
    PATIENT_DATA,
    PATIENT_FETCH_FAIL
} from '../actions.js'

import { checkStatus, backendUrl, composeAuth } from '../../helpers/utils'

// get requests

const emitStart = () => ({
    type: PATIENT_FETCH_START
})

const emitFail = errMsg => ({
    type: PATIENT_FETCH_FAIL,
    errMsg
})

const emitPatientData = data => {
    return {
        type: PATIENT_DATA,
        data
    }
}

// fetch medications 
export const startFetchPatientList = (data) => {
    return async (dispatch) => {
        dispatch(emitStart())
        try {
            const receivedData = await fetchPatientList(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitPatientData(response?.data))
        } catch (err) {
            dispatch(emitFail())
        }
    }
}

const fetchPatientList = ({jwt}) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + '/api/profile/patients'
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        }
    })
}
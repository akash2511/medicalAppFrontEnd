import {
    PRESCRIPTION_FETCH_START,
    PRESCRIPTION_DATA,
    PRESCRIPTION_FETCH_FAIL
} from '../actions.js'

import { checkStatus, backendUrl, composeAuth } from '../../helpers/utils'

// get requests

const emitStart = () => ({
    type: PRESCRIPTION_FETCH_START
})

const emitFail = errMsg => ({
    type: PRESCRIPTION_FETCH_FAIL,
    errMsg
})

const emitPrescriptionData = data => {
    return {
        type: PRESCRIPTION_DATA,
        data
    }
}

// post prescription
export const startPostPrescription = (data) => {
    return async (dispatch) => {
        dispatch(emitStart())
        try {
            const receivedData = await postPrescription(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitPrescriptionData(response?.data))
        } catch (err) {
            dispatch(emitFail())
        }
    }
}

const postPrescription = ({jwt, data}) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + '/api/prescription'
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        },
        body:JSON.stringify(data)
    })
}
import {
    EMR_FETCH_START,
    EMR_DATA,
    EMR_FETCH_FAIL
} from '../actions.js'

import { checkStatus, backendUrl, composeAuth } from '../../helpers/utils'

// get requests

const emitStart = () => ({
    type: EMR_FETCH_START
})

const emitFail = errMsg => ({
    type: EMR_FETCH_FAIL,
    errMsg
})

const emitEmrData = data => {
    return {
        type: EMR_DATA,
        data
    }
}

// fetch medications 
export const startFetchEmr = (data) => {
    return async (dispatch) => {
        dispatch(emitStart())
        try {
            const receivedData = await fetchEmr(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitEmrData(response?.data))
        } catch (err) {
            dispatch(emitFail())
        }
    }
}

const fetchEmr = ({jwt, patientId}) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + `/api/emr/patient/${patientId}`
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        }
    })
}
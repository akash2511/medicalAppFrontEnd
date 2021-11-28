import {
    MEDICATIONS_FETCH_START,
    MEDICATIONS_DATA,
    MEDICATIONS_FETCH_FAIL
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
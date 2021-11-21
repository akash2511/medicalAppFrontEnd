import {
    MEDICATIONS_FETCH_START,
    MEDICATIONS_DATA,
    MEDICATIONS_FETCH_FAIL
} from '../actions.js'

import { checkStatus } from '../../helpers/utils'

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
export const startFetchMedications = () => {
    return async (dispatch) => {
        dispatch(emitStart())
        try {
            const receivedData = await fetchMedications()
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitMedicationsData(response?.data))
        } catch (err) {
            dispatch(emitFail())
        }
    }
}

const fetchMedications = () => {
    let url = '/api/events'
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
}
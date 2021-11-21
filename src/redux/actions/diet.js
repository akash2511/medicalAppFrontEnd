import {
    DIET_FETCH_START,
    DIET_DATA,
    DIET_FETCH_FAIL
} from '../actions.js'

import { checkStatus, backendUrl } from '../../helpers/utils'

// get requests

const emitStart = () => ({
    type: DIET_FETCH_START
})

const emitFail = errMsg => ({
    type: DIET_FETCH_FAIL,
    errMsg
})

const emitDietData = data => {
    return {
        type: DIET_DATA,
        data
    }
}

// fetch Diet 
export const startFetchDiet = () => {
    return async (dispatch) => {
        dispatch(emitStart())
        try {
            const receivedData = await fetchDiet()
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitDietData(response?.data))
        } catch (err) {
            dispatch(emitFail())
        }
    }
}

const fetchDiet = () => {
    let url = backendUrl + '/api/diet'
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
}
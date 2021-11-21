import {
    SUPPLEMENTS_FETCH_START,
    SUPPLEMENTS_DATA,
    SUPPLEMENTS_FETCH_FAIL
} from '../actions.js'

import { checkStatus, backendUrl } from '../../helpers/utils'

// get requests

const emitStart = () => ({
    type: SUPPLEMENTS_FETCH_START
})

const emitFail = errMsg => ({
    type: SUPPLEMENTS_FETCH_FAIL,
    errMsg
})

const emitSupplementsData = data => {
    return {
        type: SUPPLEMENTS_DATA,
        data
    }
}

// fetch Supplements 
export const startFetchSupplements = () => {
    return async (dispatch) => {
        dispatch(emitStart())
        try {
            const receivedData = await fetchSupplements()
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitSupplementsData(response?.data))
        } catch (err) {
            dispatch(emitFail())
        }
    }
}

const fetchSupplements = () => {
    let url = backendUrl + '/api/vitamins&supplements'
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
}
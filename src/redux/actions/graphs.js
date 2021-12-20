import {
    COVID_GRAPH_FETCH_START,
    COVID_GRAPH_DATA,
    COVID_GRAPH_FETCH_FAIL
} from '../actions.js'

import { checkStatus, backendUrl, composeAuth } from '../../helpers/utils'

// get requests

const emitCovidGraphStart = () => ({
    type: COVID_GRAPH_FETCH_START
})

const emitCovidGraphFail = errMsg => ({
    type: COVID_GRAPH_FETCH_FAIL,
    errMsg
})

const emitCovidGraphData = data => {
    return {
        type: COVID_GRAPH_DATA,
        data
    }
}

// fetch covid graph 
export const startFetchCovidGraphData = (data) => {
    return async (dispatch) => {
        dispatch(emitCovidGraphStart())
        try {
            const receivedData = await fetchCovidGraphData(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitCovidGraphData(response?.data))
        } catch (err) {
            dispatch(emitCovidGraphFail())
        }
    }
}

const fetchCovidGraphData = ({ jwt, patientId }) => {
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
import {
    COVID_GRAPH_FETCH_START,
    COVID_GRAPH_DATA,
    COVID_GRAPH_FETCH_FAIL,
    CALORIES_BURNT_GRAPH_FETCH_START,
    CALORIES_BURNT_GRAPH_FETCH_FAIL,
    CALORIES_BURNT_GRAPH_DATA,
    CALORIES_INTAKE_GRAPH_FETCH_START,
    CALORIES_INTAKE_GRAPH_FETCH_FAIL,
    CALORIES_INTAKE_GRAPH_DATA,
    SLEEP_GRAPH_FETCH_START,
    SLEEP_GRAPH_FETCH_FAIL,
    SLEEP_GRAPH_DATA
} from '../actions.js'

import { checkStatus, backendUrl, composeAuth } from '../../helpers/utils'

// fetch covid graph 
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
    let url = backendUrl + `/api/report/covid/${patientId}`
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        }
    })
}

// fetch calories burnt graph 
const emitCaloriesBurntGraphStart = () => ({
    type: CALORIES_BURNT_GRAPH_FETCH_START
})

const emitCaloriesBurntGraphFail = errMsg => ({
    type: CALORIES_BURNT_GRAPH_FETCH_FAIL,
    errMsg
})

const emitCaloriesBurntGraphData = data => {
    return {
        type: CALORIES_BURNT_GRAPH_DATA,
        data
    }
}

export const startFetchCaloriesBurntGraphData = (data) => {
    return async (dispatch) => {
        dispatch(emitCaloriesBurntGraphStart())
        try {
            const receivedData = await fetchCaloriesBurntGraphData(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitCaloriesBurntGraphData(response?.data))
        } catch (err) {
            dispatch(emitCaloriesBurntGraphFail())
        }
    }
}

const fetchCaloriesBurntGraphData = ({ jwt, patientId }) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + `/api/report/calories-burnt/${patientId}`
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        }
    })
}

// fetch calories intake graph 
const emitCaloriesIntakeGraphStart = () => ({
    type: CALORIES_INTAKE_GRAPH_FETCH_START
})

const emitCaloriesIntakeGraphFail = errMsg => ({
    type: CALORIES_INTAKE_GRAPH_FETCH_FAIL,
    errMsg
})

const emitCaloriesIntakeGraphData = data => {
    return {
        type: CALORIES_INTAKE_GRAPH_DATA,
        data
    }
}

export const startFetchCaloriesIntakeGraphData = (data) => {
    return async (dispatch) => {
        dispatch(emitCaloriesIntakeGraphStart())
        try {
            const receivedData = await fetchCaloriesIntakeGraphData(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitCaloriesIntakeGraphData(response?.data))
        } catch (err) {
            dispatch(emitCaloriesIntakeGraphFail())
        }
    }
}

const fetchCaloriesIntakeGraphData = ({ jwt, patientId }) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + `/api/report/calories-intake/${patientId}`
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        }
    })
}

// fetch sleep graph 
const emitSleepGraphStart = () => ({
    type: SLEEP_GRAPH_FETCH_START
})

const emitSleepGraphFail = errMsg => ({
    type: SLEEP_GRAPH_FETCH_FAIL,
    errMsg
})

const emitSleepGraphData = data => {
    return {
        type: SLEEP_GRAPH_DATA,
        data
    }
}

export const startFetchSleepGraphData = (data) => {
    return async (dispatch) => {
        dispatch(emitSleepGraphStart())
        try {
            const receivedData = await fetchSleepGraphData(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitSleepGraphData(response?.data))
        } catch (err) {
            dispatch(emitSleepGraphFail())
        }
    }
}

const fetchSleepGraphData = ({ jwt, patientId }) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + `/api/report/sleep/${patientId}`
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        }
    })
}
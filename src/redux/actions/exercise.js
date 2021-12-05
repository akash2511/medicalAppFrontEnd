import {
    EXERCISE_FETCH_START,
    EXERCISE_DATA,
    EXERCISE_FETCH_FAIL
} from '../actions.js'

import { checkStatus, backendUrl } from '../../helpers/utils'

// get requests

const emitStart = () => ({
    type: EXERCISE_FETCH_START
})

const emitFail = errMsg => ({
    type: EXERCISE_FETCH_FAIL,
    errMsg
})

const emitExerciseData = data => {
    return {
        type: EXERCISE_DATA,
        data
    }
}

// fetch Exercise 
export const startFetchExercise = () => {
    return async (dispatch) => {
        dispatch(emitStart())
        try {
            const receivedData = await fetchExercise()
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitExerciseData(response?.data))
        } catch (err) {
            dispatch(emitFail())
        }
    }
}

const fetchExercise = () => {
    let url = backendUrl + '/api/exercises'
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
}
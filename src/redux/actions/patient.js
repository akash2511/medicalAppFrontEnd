import {
    PATIENT_MEAL_START,
    PATIENT_MEAL_DATA,
    PATIENT_MEAL_FAIL,
    PATIENT_SELF_MANAGEMENT_START,
    PATIENT_SELF_MANAGEMENT_FAIL,
    PATIENT_SELF_MANAGEMENT_DATA
} from '../actions.js'

import { checkStatus, backendUrl, composeAuth } from '../../helpers/utils'

// get requests

const emitStart = () => ({
    type: PATIENT_MEAL_START
})

const emitFail = () => ({
    type: PATIENT_MEAL_FAIL,
})

const emitPatientMealData = data => {
    return {
        type: PATIENT_MEAL_DATA,
        data
    }
}

// fetch meal 
export const startFetchPatientMeal = (data) => {
    return async (dispatch) => {
        dispatch(emitStart())
        try {
            const receivedData = await fetchPatientMealByDate(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitPatientMealData(response?.data))
        } catch (err) {
            dispatch(emitFail())
        }
    }
}

const fetchPatientMealByDate = ({jwt, date}) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + `/api/patient-meal-record/${date}`
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        }
    })
}

// post meal 
export const startPostPatientMeal = (data) => {
    return async (dispatch) => {
        dispatch(emitStart())
        try {
            const receivedData = await postPatientMealByDate(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitPatientMealData(response?.data))
        } catch (err) {
            dispatch(emitFail())
        }
    }
}

const postPatientMealByDate = ({jwt, data}) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + `/api/patient-meal-record`
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        },
        body: JSON.stringify(data)
    })
}

// edit meal 
export const startEditPatientMeal = (data) => {
    return async (dispatch) => {
        dispatch(emitStart())
        try {
            const receivedData = await editPatientMealByDate(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitPatientMealData(response?.data))
        } catch (err) {
            dispatch(emitFail())
        }
    }
}

const editPatientMealByDate = ({jwt, data, id}) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + `/api/patient-meal-record/${id}`
    return fetch(url, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        },
        body: JSON.stringify(data)
    })
}

// get requests

const emitPatientSelfManagementStart = () => ({
    type: PATIENT_SELF_MANAGEMENT_START
})

const emitPatientSelfManagementFail = () => ({
    type: PATIENT_SELF_MANAGEMENT_FAIL,
})

const emitPatientSelfManagementData = data => {
    return {
        type: PATIENT_SELF_MANAGEMENT_DATA,
        data
    }
}

// fetch self Mangement 
export const startFetchPatientSelfManagement = (data) => {
    return async (dispatch) => {
        dispatch(emitPatientSelfManagementStart())
        try {
            const receivedData = await fetchPatientSelfManagementByDate(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitPatientSelfManagementData(response?.data))
        } catch (err) {
            dispatch(emitPatientSelfManagementFail())
        }
    }
}

const fetchPatientSelfManagementByDate = ({jwt, date}) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + `/api/patient-self-management-record/${date}`
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        }
    })
}

// post self Mangement 
export const startPostPatientSelfManagement = (data) => {
    return async (dispatch) => {
        dispatch(emitPatientSelfManagementStart())
        try {
            const receivedData = await postPatientSelfManagementByDate(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitPatientSelfManagementData(response?.data))
        } catch (err) {
            dispatch(emitPatientSelfManagementFail())
        }
    }
}

const postPatientSelfManagementByDate = ({jwt, data}) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + `/api/patient-self-management-record`
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

// edit self Mangement 
export const startEditPatientSelfManagement = (data) => {
    return async (dispatch) => {
        dispatch(emitPatientSelfManagementStart())
        try {
            const receivedData = await editPatientSelfManagementByDate(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitPatientSelfManagementData(response?.data))
        } catch (err) {
            dispatch(emitPatientSelfManagementFail())
        }
    }
}

const editPatientSelfManagementByDate = ({jwt, data, id}) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + `/api/patient-self-management-record/${id}`
    return fetch(url, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        },
        body: JSON.stringify(data)
    })
}
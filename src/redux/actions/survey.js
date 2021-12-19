import {
    SURVEY_ALL_FETCH_START,
    SURVEY_ALL_DATA,
    SURVEY_ALL_FETCH_FAIL,
    SURVEY_QUESTIONS_FETCH_START,
    SURVEY_QUESTIONS_DATA,
    SURVEY_QUESTIONS_FETCH_FAIL,
    SURVEY_SUBMISSIONS_FETCH_START,
    SURVEY_SUBMISSIONS_FETCH_FAIL,
    SURVEY_SUBMISSIONS_DATA,
    POST_SURVEY_SUBMISSION_START,
    POST_SURVEY_SUBMISSION_FAIL,
    POST_SURVEY_SUBMISSION_DATA,
    PUT_SURVEY_SUBMISSION_START,
    PUT_SURVEY_SUBMISSION_FAIL,
    PUT_SURVEY_SUBMISSION_DATA
} from '../actions.js'

import { checkStatus, backendUrl, composeAuth } from '../../helpers/utils'

// fetch All surveys 
const emitFetchAllSurveysStart = () => ({
    type: SURVEY_ALL_FETCH_START,

})

const emitFetchAllSurveysFail = errMsg => ({
    type: SURVEY_ALL_FETCH_FAIL,
    errMsg
})

const emitFetchAllSurveysData = data => {
    return {
        type: SURVEY_ALL_DATA,
        data
    }
}

export const startFetchAllSurveys = (data) => {
    return async (dispatch) => {
        dispatch(emitFetchAllSurveysStart())
        try {
            const receivedData = await fetchAllSurveys(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitFetchAllSurveysData(response?.data))
        } catch (err) {
            dispatch(emitFetchAllSurveysFail())
        }
    }
}

const fetchAllSurveys = ({jwt}) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + '/api/survey'
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        }
    })
}

// fetch All questions by survey id 
const emitFetchAllSurveyQuestionsStart = () => ({
    type: SURVEY_QUESTIONS_FETCH_START,

})

const emitFetchAllSurveyQuestionsFail = errMsg => ({
    type: SURVEY_QUESTIONS_FETCH_FAIL,
    errMsg
})

const emitFetchAllSurveyQuestionsData = data => {
    return {
        type: SURVEY_QUESTIONS_DATA,
        data
    }
}

export const startFetchAllSurveyQuestions = (data) => {
    return async (dispatch) => {
        dispatch(emitFetchAllSurveyQuestionsStart())
        try {
            const receivedData = await fetchAllSurveyQuestions(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitFetchAllSurveyQuestionsData(response?.data))
        } catch (err) {
            dispatch(emitFetchAllSurveyQuestionsFail())
        }
    }
}

const fetchAllSurveyQuestions = ({jwt, surveyId}) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + `/api/survey-question/survey/${surveyId}`
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        }
    })
}

// fetch All submissions by survey id 
const emitFetchAllSurveySubmissionsStart = () => ({
    type: SURVEY_SUBMISSIONS_FETCH_START,

})

const emitFetchAllSurveySubmissionsFail = errMsg => ({
    type: SURVEY_SUBMISSIONS_FETCH_FAIL,
    errMsg
})

const emitFetchAllSurveySubmissionsData = data => {
    return {
        type: SURVEY_SUBMISSIONS_DATA,
        data
    }
}

export const startFetchAllSurveySubmissions = (data) => {
    return async (dispatch) => {
        dispatch(emitFetchAllSurveySubmissionsStart())
        try {
            const receivedData = await fetchAllSurveySubmissions(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitFetchAllSurveySubmissionsData(response?.data?.surveySubmissions))
        } catch (err) {
            dispatch(emitFetchAllSurveySubmissionsFail())
        }
    }
}

const fetchAllSurveySubmissions = ({jwt, profileId, surveyId}) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + `/api/survey-submission/profile/${profileId}/survey/${surveyId}`
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        }
    })
}

// post submissions by question id 
const emitPostSubmissionStart = () => ({
    type: POST_SURVEY_SUBMISSION_START,

})

const emitPostSubmissionFail = errMsg => ({
    type: POST_SURVEY_SUBMISSION_FAIL,
    errMsg
})

const emitPostSubmissionData = data => {
    return {
        type: POST_SURVEY_SUBMISSION_DATA,
        data
    }
}

export const startPostSurveySubmissions = (data) => {
    return async (dispatch) => {
        dispatch(emitPostSubmissionStart())
        try {
            const receivedData = await postSurveySubmissions(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitPostSubmissionData(response?.data))
        } catch (err) {
            dispatch(emitPostSubmissionFail())
        }
    }
}

const postSurveySubmissions = ({jwt, data}) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + '/api/survey-submissions'
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

// put submissions by question id 
const emitPutSubmissionStart = () => ({
    type: PUT_SURVEY_SUBMISSION_START,

})

const emitPutSubmissionFail = errMsg => ({
    type: PUT_SURVEY_SUBMISSION_FAIL,
    errMsg
})

const emitPutSubmissionData = data => {
    return {
        type: PUT_SURVEY_SUBMISSION_DATA,
        data
    }
}

export const startPutSurveySubmissions = (data) => {
    return async (dispatch) => {
        dispatch(emitPutSubmissionStart())
        try {
            const receivedData = await putSurveySubmissions(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitPutSubmissionData(response?.data))
        } catch (err) {
            dispatch(emitPutSubmissionFail())
        }
    }
}

const putSurveySubmissions = ({ jwt, data, submissionId}) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + `/api/survey-submissions`
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
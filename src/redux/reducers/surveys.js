import {
    APP_LOGOUT,
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
} from '../actions'

const initialState = {
    isLoadingFetchAllSurveys: false,
    isLoadingPostSurveySubmissions: false,
    isLoadingPutSurveySubmissions: false,
    isLoadingFetchAllSurveyQuestions:false,
    isLoadingFetchAllSurveySubmissions:false,
    isErr: false,
    allsurveys: [],
    allSurveyQuestions: [],
    allSurveySubmissions: []
}

export const surveys = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOGOUT:
            return initialState
        case SURVEY_ALL_FETCH_START:
            return Object.assign({}, state, {
                isLoadingFetchAllSurveys: true,
                isErr: false,
            })
        case SURVEY_ALL_FETCH_FAIL:
            return Object.assign({}, state, {
                isLoadingFetchAllSurveys: false,
                isErr: true,
            })
        case SURVEY_ALL_DATA:
            return Object.assign({}, state, {
                isLoadingFetchAllSurveys: false,
                allsurveys: action.data,
                isErr: false,
            })
        case SURVEY_QUESTIONS_FETCH_START:
            return Object.assign({}, state, {
                isLoadingFetchAllSurveyQuestions: true,
                isErr: false,
            })
        case SURVEY_QUESTIONS_FETCH_FAIL:
            return Object.assign({}, state, {
                isLoadingFetchAllSurveyQuestions: false,
                isErr: true,
            })
        case SURVEY_QUESTIONS_DATA:
            return Object.assign({}, state, {
                isLoadingFetchAllSurveyQuestions: false,
                allSurveyQuestions: action.data,
                isErr: false,
            })
        case SURVEY_SUBMISSIONS_FETCH_START:
            return Object.assign({}, state, {
                isLoadingFetchAllSurveySubmissions: true,
                isErr: false,
            })
        case SURVEY_SUBMISSIONS_FETCH_FAIL:
            return Object.assign({}, state, {
                isLoadingFetchAllSurveySubmissions: false,
                isErr: true,
            })
        case SURVEY_SUBMISSIONS_DATA:
            return Object.assign({}, state, {
                isLoadingFetchAllSurveySubmissions: false,
                allSurveySubmissions: action.data,
                isErr: false,
            })
        case POST_SURVEY_SUBMISSION_START:
            return Object.assign({}, state, {
                isLoadingPostSurveySubmissions: true,
                isErr: false,
            })
        case POST_SURVEY_SUBMISSION_FAIL:
            return Object.assign({}, state, {
                isLoadingPostSurveySubmissions: false,
                isErr: true,
            })
        case POST_SURVEY_SUBMISSION_DATA:
            return Object.assign({}, state, {
                isLoadingPostSurveySubmissions: false,
                isErr: false,
            })
        case PUT_SURVEY_SUBMISSION_START:
            return Object.assign({}, state, {
                isLoadingPutSurveySubmissions: true,
                isErr: false,
            })
        case PUT_SURVEY_SUBMISSION_FAIL:
            return Object.assign({}, state, {
                isLoadingPutSurveySubmissions: false,
                isErr: true,
            })
        case PUT_SURVEY_SUBMISSION_DATA:
            return Object.assign({}, state, {
                isLoadingPutSurveySubmissions: false,
                isErr: false,
            })
        default:
            return state
    }
}

export const getisLoadingPostSurveySubmissions = state => state.surveys.isLoadingPostSurveySubmissions
export const getisLoadingPutSurveySubmissions = state => state.surveys.isLoadingPutSurveySubmissions
export const getisLoadingFetchAllSurveys = state => state.surveys.isLoadingFetchAllSurveys
export const getAllsurveys = state => state.surveys.allsurveys
export const getisLoadingFetchAllSurveyQuestions = state => state.surveys.isLoadingFetchAllSurveyQuestions
export const getallSurveyQuestions = state => state.surveys.allSurveyQuestions
export const getisLoadingFetchAllSurveySubmissions = state => state.surveys.isLoadingFetchAllSurveySubmissions
export const getallSurveySubmissions = state => state.surveys.allSurveySubmissions
export const getisError = state => state.surveys.isErr

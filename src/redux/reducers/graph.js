import {
    APP_LOGOUT,
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
} from '../actions'

const initialState = {
    isLoading: false,
    isErr: false,
    errMsg: '',
    covidGraph: [],
    successMsg: '',
    isLoadingCaloriesBurnt:false,
    caloriesBurntGraph:[],
    isLoadingCaloriesIntake: false,
    caloriesIntakeGraph: [],
    isLoadingSleepGraph: false,
    sleepGraph: []
}

export const graph = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOGOUT:
            return initialState
        case COVID_GRAPH_FETCH_START:
            return Object.assign({}, state, {
                isLoading: true,
                isErr: false,
                errMsg: '',
                successMsg: ''
            })
        case COVID_GRAPH_FETCH_FAIL:
            return Object.assign({}, state, {
                isLoading: false,
                isErr: true,
                errMsg: action.errMsg,
                successMsg: ''
            })
        case COVID_GRAPH_DATA:
            return Object.assign({}, state, {
                isLoading: false,
                covidGraph: action.data,
                successMsg: '',
                isErr: false,
            })
        case CALORIES_BURNT_GRAPH_FETCH_START:
            return Object.assign({}, state, {
                isLoadingCaloriesBurnt: true,
                isErr: false,
                errMsg: '',
                successMsg: ''
            })
        case CALORIES_BURNT_GRAPH_FETCH_FAIL:
            return Object.assign({}, state, {
                isLoadingCaloriesBurnt: false,
                isErr: true,
                errMsg: action.errMsg,
                successMsg: ''
            })
        case CALORIES_BURNT_GRAPH_DATA:
            return Object.assign({}, state, {
                isLoadingCaloriesBurnt: false,
                caloriesBurntGraph: action.data,
                successMsg: '',
                isErr: false,
            })
        case CALORIES_INTAKE_GRAPH_FETCH_START:
            return Object.assign({}, state, {
                isLoadingCaloriesIntake: true,
                isErr: false,
                errMsg: '',
                successMsg: ''
            })
        case CALORIES_INTAKE_GRAPH_FETCH_FAIL:
            return Object.assign({}, state, {
                isLoadingCaloriesIntake: false,
                isErr: true,
                errMsg: action.errMsg,
                successMsg: ''
            })
        case CALORIES_INTAKE_GRAPH_DATA:
            return Object.assign({}, state, {
                isLoadingCaloriesIntake: false,
                caloriesIntakeGraph: action.data,
                successMsg: '',
                isErr: false,
            })
        case SLEEP_GRAPH_FETCH_START:
            return Object.assign({}, state, {
                isLoadingSleepGraph: true,
                isErr: false,
                errMsg: '',
                successMsg: ''
            })
        case SLEEP_GRAPH_FETCH_FAIL:
            return Object.assign({}, state, {
                isLoadingSleepGraph: false,
                isErr: true,
                errMsg: action.errMsg,
                successMsg: ''
            })
        case SLEEP_GRAPH_DATA:
            return Object.assign({}, state, {
                isLoadingSleepGraph: false,
                sleepGraph: action.data,
                successMsg: '',
                isErr: false,
            })
        default:
            return state
    }
}

export const getIsCovidGraphLoading = state => state.graph.isLoading
export const getCovidGraph = state => state.graph.covidGraph
export const getIsErr = state => state.graph.isErr
export const getSuccessMsg = state => state.graph.successMsg
export const getIsLoadingCaloriesBurnt = state => state.graph.isLoadingCaloriesBurnt
export const getCaloriesBurntGraph = state => state.graph.caloriesBurntGraph
export const getIsLoadingCaloriesIntake = state => state.graph.isLoadingCaloriesIntake
export const getCaloriesIntakeGraph = state => state.graph.caloriesIntakeGraph
export const getIsLoadingSleepGraph = state => state.graph.isLoadingSleepGraph
export const getSleepGraph = state => state.graph.sleepGraph
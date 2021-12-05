import {
    APP_LOGOUT,
    EXERCISE_FETCH_START,
    EXERCISE_DATA,
    EXERCISE_FETCH_FAIL
} from '../actions'

const initialState = {
    isLoading: false,
    isErr: false,
    errMsg: '',
    allExercise: [],
    successMsg: ''
}

export const exercise = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOGOUT:
            return initialState
        case EXERCISE_FETCH_START:
            return Object.assign({}, state, {
                isLoading: true,
                isErr: false,
                errMsg: '',
                successMsg: ''
            })
        case EXERCISE_FETCH_FAIL:
            return Object.assign({}, state, {
                isLoading: false,
                isErr: true,
                errMsg: action.errMsg,
                successMsg: ''
            })
        case EXERCISE_DATA:
            return Object.assign({}, state, {
                isLoading: false,
                allExercise: action.data,
                successMsg: ''
            })
        default:
            return state
    }
}

export const getisExerciseLoading = state => state.exercise.isLoading
export const getExercise = state => state.exercise.allExercise
export const getSuccessMsg = state => state.exercise.successMsg

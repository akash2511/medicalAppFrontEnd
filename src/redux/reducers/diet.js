import {
    APP_LOGOUT,
    DIET_FETCH_START,
    DIET_DATA,
    DIET_FETCH_FAIL
} from '../actions'

const initialState = {
    isLoading: false,
    isErr: false,
    errMsg: '',
    allDiet: [],
    successMsg: ''
}

export const diet = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOGOUT:
            return initialState
        case DIET_FETCH_START:
            return Object.assign({}, state, {
                isLoading: true,
                isErr: false,
                errMsg: '',
                successMsg: ''
            })
        case DIET_FETCH_FAIL:
            return Object.assign({}, state, {
                isLoading: false,
                isErr: true,
                errMsg: action.errMsg,
                successMsg: ''
            })
        case DIET_DATA:
            return Object.assign({}, state, {
                isLoading: false,
                allDiet: action.data,
                successMsg: ''
            })
        default:
            return state
    }
}

export const getisDietLoading = state => state.diet.isLoading
export const geDiet = state => state.diet.allDiet
export const getSuccessMsg = state => state.diet.successMsg

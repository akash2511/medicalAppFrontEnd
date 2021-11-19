import {
    ADD_DIET_ITEM,
    ADD_SUPPLEMENT_ITEM,
    APP_LOGIN,
    APP_LOGOUT
} from '../actions'

const initialState = {
    diet:[],
    supplement:[],
    isLoggedIn:false,
    username:"",
    password:"",
    userId:""
}

export const uiData = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOGIN:
            return Object.assign({}, state, {
                isLoggedIn: true,
                username: action?.data?.username,
                password: action?.data?.password,
                userId: action?.data?.userId
            })
        case ADD_DIET_ITEM:
            return Object.assign({}, state, {
                diet:action.data
            })
        case ADD_SUPPLEMENT_ITEM:
            return Object.assign({}, state, {
                supplement: action.data
            })
        case APP_LOGOUT:
            return Object.assign({}, state, initialState)
        default:
            return state
    }
}

export const getAddedDiet = state => state.uiData.diet
export const getAddedSupplement = state => state.uiData.supplement
export const getIsLoggedIn = state => state.uiData.isLoggedIn
export const getUsername = state => state.uiData.username

import {
    ADD_DIET_ITEM,
    ADD_SUPPLEMENT_ITEM,
    APP_LOGIN,
    APP_LOGOUT
} from '../actions.js'

export const addDietItem = data => {
    return {
        type: ADD_DIET_ITEM,
        data
    }
}

export const addSupplementItem = data => {
    return {
        type: ADD_SUPPLEMENT_ITEM,
        data
    }
}

export const appLogin = data => {
    return {
        type: APP_LOGIN,
        data
    }
}
export const appLogout = () => {
    return {
        type: APP_LOGOUT
    }
}
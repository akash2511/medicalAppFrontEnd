import { backendUrl, parseJSON } from '../../helpers/utils'
import {
    APP_LOGIN_START,
    APP_LOGIN,
    APP_LOGIN_FAIL,
    APP_LOGOUT
} from '../actions'

export const emitLoginStart = () => ({
    type: APP_LOGIN_START
})

export const emitLoggedIn = data => {
    return {
        type: APP_LOGIN,
        ...data
    }
}
export const emitLoginFail = () => ({
    type: APP_LOGIN_FAIL
})

export const emitLogoutaction = () => ({
    type: APP_LOGOUT
})


//login
const appLogin = (user, password) => {
    let url = backendUrl + '/api/user/login'
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user,
            password: password
        })
    })
}

export const emitLogin = (user, password) => {
    return (dispatch) => {
        dispatch(emitLoginStart())
        return appLogin(user, password)
            .then(parseJSON)
            .then(json => {
                if (json.statusCode >= 200 && json.statusCode < 300) {
                    dispatch(emitLoggedIn(json))
                } else {
                    dispatch(emitLoginFail())
                }
            })
            .catch(err => {
                dispatch(emitLoginFail())
            })
    }
}
import { backendUrl, parseJSON, composeAuth } from '../../helpers/utils'
import {
    APP_LOGIN_START,
    APP_LOGIN,
    APP_LOGIN_FAIL,
    APP_GET_PROFILE_START,
    APP_GET_PROFILE,
    APP_GET_PROFILE_FAIL,
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

//get profile

export const emitGetProfileStart = () => ({
    type: APP_GET_PROFILE_START
})

export const emitGetProfile = data => {
    return {
        type: APP_GET_PROFILE,
        data
    }
}
export const emitGetProfileFail = () => ({
    type: APP_GET_PROFILE_FAIL
})

const getProfile = ({jwt}) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + '/api/profile/me'
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        }
    })
}

export const fetchProfile = (data) => {
    return (dispatch) => {
        dispatch(emitGetProfileStart())
        return getProfile(data)
            .then(parseJSON)
            .then(json => {
                if (json.statusCode >= 200 && json.statusCode < 300) {
                    dispatch(emitGetProfile(json.data))
                } else {
                    dispatch(emitGetProfileFail())
                }
            })
            .catch(err => {
                dispatch(emitGetProfileFail())
            })
    }
}


//edit profile
const editProfile = ({jwt, data, id}) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + `/api/profile/${id}`
    return fetch(url, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        },
        body:JSON.stringify(data)
    })
}

export const startEditProfile = (data) => {
    return (dispatch) => {
        dispatch(emitGetProfileStart())
        return editProfile(data)
            .then(parseJSON)
            .then(json => {
                if (json.statusCode >= 200 && json.statusCode < 300) {
                    dispatch(emitGetProfile(json.data))
                } else {
                    dispatch(emitGetProfileFail())
                }
            })
            .catch(err => {
                dispatch(emitGetProfileFail())
            })
    }
}
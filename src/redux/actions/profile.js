import {
    PROFILE_FETCH_START,
    PROFILE_DATA,
    PROFILE_FETCH_FAIL
} from '../actions.js'

import { checkStatus, backendUrl, composeAuth } from '../../helpers/utils'

// get requests

const emitStart = () => ({
    type: PROFILE_FETCH_START
})

const emitFail = errMsg => ({
    type: PROFILE_FETCH_FAIL,
    errMsg
})

const emitProfileData = data => {
    return {
        type: PROFILE_DATA,
        data
    }
}

// fetch profile 
export const startFetchProfile = (data) => {
    return async (dispatch) => {
        dispatch(emitStart())
        try {
            const receivedData = await fetchProfile(data)
            const validatedData = checkStatus(receivedData)
            const response = await validatedData.json()
            dispatch(emitProfileData(response?.data))
        } catch (err) {
            dispatch(emitFail())
        }
    }
}

const fetchProfile = ({jwt, profileId}) => {
    let Authorization = composeAuth(jwt)
    let url = backendUrl + `/api/profile/ids?ids=${profileId}`
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization
        }
    })
}
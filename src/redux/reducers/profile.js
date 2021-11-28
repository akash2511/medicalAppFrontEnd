import {
    APP_LOGOUT,
    PROFILE_FETCH_START,
    PROFILE_DATA,
    PROFILE_FETCH_FAIL
} from '../actions'

const initialState = {
    isLoading: false,
    isErr: false,
    errMsg: '',
    profileDetails: {},
    successMsg: ''
}

export const profile = (state = initialState, action) => {
    switch (action.type) {
        case APP_LOGOUT:
            return initialState
        case PROFILE_FETCH_START:
            return Object.assign({}, state, {
                isLoading: true,
                isErr: false,
                errMsg: '',
                successMsg: ''
            })
        case PROFILE_FETCH_FAIL:
            return Object.assign({}, state, {
                isLoading: false,
                isErr: true,
                errMsg: action.errMsg,
                successMsg: ''
            })
        case PROFILE_DATA:
            return Object.assign({}, state, {
                isLoading: false,
                profileDetails: action.data,
                successMsg: ''
            })
        default:
            return state
    }
}

export const getIsProfileLoading = state => state.profile.isLoading
export const getProfileDetails = state => state.profile.profileDetails
export const getSuccessMsg = state => state.profile.successMsg

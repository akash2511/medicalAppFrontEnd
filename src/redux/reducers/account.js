import {
  APP_LOGIN_START,
  APP_LOGIN,
  APP_LOGIN_FAIL,
  APP_GET_PROFILE_START,
  APP_GET_PROFILE,
  APP_GET_PROFILE_FAIL,
  APP_LOGOUT,
} from '../actions'

const initialState = {
  isLoggedIn: false,
  jwt: '',
  isLoading:false,
  message:"",
  error:false,
  userId:"",
  roles:[],
  userName:"",
  level:"",
  isLoadingGetProfile:false,
  profileDetails:{}
}

export const accounts = (state = initialState, action) => {
  switch (action.type) {
    case APP_LOGIN_START:
      return Object.assign({}, state, {
        isLoading:true,
        error: false,
        message: ''
      })
    case APP_LOGIN:
      return Object.assign({}, state, {
        isLoading: false,
        isLoggedIn: true,
        error: false,
        message: '',
        jwt: action.jwt,
        userId: action._id,
        roles: action.roles,
        userName: action.user,
        level: action.user_type
      })
    case APP_LOGIN_FAIL:
      return Object.assign({}, state, {
        isLoading: false,
        isLoggedIn: false,
        error: true,
        jwt: '',
        userId: "",
        roles: [],
        userName: "",
        level: "",
        message: 'Incorrect username/password. Please try again.'
      })
    case APP_GET_PROFILE_START:
      return Object.assign({}, state, {
        isLoadingGetProfile: true,
        error: false,
      })
    case APP_GET_PROFILE_FAIL:
      return Object.assign({}, state, {
        isLoadingGetProfile: false,
        error: true,
      })
    case APP_GET_PROFILE:
      return Object.assign({}, state, {
        isLoadingGetProfile: false,
        profileDetails: action.data,
        error: false,
      })
    case APP_LOGOUT:
      return initialState
    default:
      return state
  }
}

export const getError = state => state.accounts.error
export const getMsg = state => state.accounts.message
export const getLoggedIn = state => state.accounts.isLoggedIn
export const getisLoading = state => state.accounts.isLoading
export const getJwt = state => state.accounts.jwt
export const getUserId = state => state.accounts.userId
export const getRoles = state => state.accounts.roles
export const getUserName = state => state.accounts.userName
export const getLevel = state => state.accounts.level
export const getIsLoadingGetProfile = state => state.accounts.isLoadingGetProfile
export const getProfileDetails = state => state.accounts.profileDetails

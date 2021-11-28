import {
  APP_LOGIN_START,
  APP_LOGIN,
  APP_LOGIN_FAIL,
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
  level:""
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

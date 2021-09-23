import { ErrorType } from '../action-types/error'
import { ActionType } from '../action-types/user'

const initalData = {
    loggedIn: false
}

export default function userReducer(state = initalData, action) {
    switch (action.type) {
        case ActionType.LOGIN:
            return { ...state, loggedIn: true }
        case ActionType.LOGOUT:
            return { ...state, loggedIn: false }
        case ActionType.CHECK_LOGIN:
            return { ...state, loggedIn: action.payload }
        case ErrorType.ERROR_CHECK_LOGIN:
            return { ...state, loggedIn: false }
        default:
            return state
    }
}

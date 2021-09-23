import { ErrorType } from "../action-types/error"

const initialData = {
    errorMessage: ""
}


export default function errorReducer(state = initialData, action) {
    switch (action.type) {
        case ErrorType.ERROR_ADD_TODO:
            return {...state, errorMessage: action.payload}
        case ErrorType.ERROR_GET_TODO:
            return {...state, errorMessage: action.payload}
        case ErrorType.ERROR_DELETE_TODO:
            return {...state, errorMessage: action.payload}
        case ErrorType.ERROR_EDIT_TODO:
            return {...state, errorMessage: action.payload}
        case ErrorType.ERROR_LOGIN:
            return {...state, errorMessage: action.payload}
        case ErrorType.ERROR_LOGOUT:
            return {...state, errorMessage: action.payload}
        case ErrorType.CLEAN_ERROR:
            return {...state, errorMessage: ""}
        default:
            return state
    }
}
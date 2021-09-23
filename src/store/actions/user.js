import { ErrorType } from "../action-types/error";
import { ActionType } from "../action-types/user";

export const login = () => async (dispatch) => {
    try {
        localStorage.setItem('loggedIn', true)
        dispatch({
            type: ActionType.LOGIN
        })
    } catch (error) {
        dispatch({
            type: ErrorType.ERROR_LOGIN,
            payload: "Error login"
        })
    }
}

export const logoutAction = () => async (dispatch) => {
    try {
        localStorage.removeItem('loggedIn')
        dispatch({
            type: ActionType.LOGOUT
        })
    } catch (error) {
        dispatch({
            type: ErrorType.ERROR_LOGOUT,
            payload: "Error to logout"
        })
    }
}

export const checkLogin = () => async (dispatch) => {
    try {
        if (JSON.parse(localStorage.getItem('loggedIn')))
            dispatch({
                type: ActionType.CHECK_LOGIN,
                payload: JSON.parse(localStorage.getItem('loggedIn'))
            })
    } catch (error) {
        dispatch({
            type: ErrorType.ERROR_CHECK_LOGIN
        })
    }
}

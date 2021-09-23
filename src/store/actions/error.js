import { ErrorType } from "../action-types/error"

export const cleanErrorAction = () => dispatch => {
    dispatch({
        type: ErrorType.CLEAN_ERROR
    })
}
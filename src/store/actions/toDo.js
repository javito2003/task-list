import { ErrorType } from "../action-types/error";
import { ActionType } from "../action-types/toDo";


export const fetchToDo = () => async (dispatch) => {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos")
        const json = await res.json()
        dispatch({
            type: ActionType.GET_TODO,
            payload: json.splice(0, 10)
        })
    } catch (error) {
        setTimeout(() => {
            fetchToDo()
        }, 3000)
        dispatch({
            type: ErrorType.ERROR_GET_TODO,
            payload: "Error to get, fetching again..."
        })
    }
}

export const deleteTodo = (id) => async(dispatch) => {
    try {
        dispatch({
            type: ActionType.DELETE_TODO,
            payload: id
        })
    } catch (error) {
        dispatch({
            type: ErrorType.ERROR_DELETE_TODO,
            payload: "Error to delete"
        })
    }
}

export const addTodo = (data) => async(dispatch) => {
    try {
        dispatch({
            type: ActionType.ADD_TODO,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ErrorType.ERROR_ADD_TODO,
            payload: "Error to add"
        })
    }
}

export const editTodo = data => async(dispatch) => {
    try {
        dispatch({
            type: ActionType.EDIT_TODO,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ErrorType.ERROR_EDIT_TODO,
            payload: "Error to edit"
        })
    }
}
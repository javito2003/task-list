import { ActionType } from "../action-types/toDo";

const initalData = {
    toDo: []
}


export default function toDoReducer(state = initalData, action) {
    switch (action.type) {
        case ActionType.GET_TODO:
            return { ...state, toDo: action.payload }
        case ActionType.ADD_TODO:
            return { ...state, toDo: [...state.toDo, action.payload] }
        case ActionType.EDIT_TODO:
            const payload = action.payload
            const toDo = [...state.toDo]
            toDo.map(item => {
                if (item.id === payload.id) {
                    item.title = payload.title
                    item.completed = payload.completed
                }
                return item
            })
            return {
                ...state,
                toDo
            }
        case ActionType.DELETE_TODO:
            return {
                ...state,
                toDo: state.toDo.filter(item => item.id !== action.payload)
            }
        default:
            return state
    }
}
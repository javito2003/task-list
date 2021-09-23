import { combineReducers } from 'redux'
import errorReducer from './error'
import toDoReducer from './toDo'
import userReducer from './user'

const reducers = combineReducers({
    toDo: toDoReducer,
    user: userReducer,
    error: errorReducer
})

export default reducers
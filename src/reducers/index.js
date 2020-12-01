import { combineReducers } from 'redux'
import gridReducer from './gridReducer'

export const reducer = combineReducers({ grid: gridReducer })
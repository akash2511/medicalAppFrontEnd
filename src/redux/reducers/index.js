import { combineReducers } from 'redux';

//other reducers
import { uiData } from './ui'
import { medications } from './medication'
import { diet } from './diet'
import { supplements } from './supplements'

export const RootReducer = combineReducers({
    uiData,
    medications,
    diet,
    supplements
})

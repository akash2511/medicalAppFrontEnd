import { combineReducers } from 'redux';

//other reducers
import { accounts } from './account'
import { profile } from './profile'
import { prescription } from './prescription'
import { emr } from './emr'
import { doctor } from './doctor'
import { uiData } from './ui'
import { medications } from './medication'
import { diet } from './diet'
import { supplements } from './supplements'
import { patient } from './patient'
import { exercise } from './exercise'

export const RootReducer = combineReducers({
    profile,
    doctor,
    prescription,
    emr,
    accounts,
    uiData,
    medications,
    diet,
    supplements,
    patient,
    exercise
})

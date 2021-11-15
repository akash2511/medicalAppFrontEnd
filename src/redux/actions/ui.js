import {
    ADD_DIET_ITEM,
    ADD_SUPPLEMENT_ITEM,
} from '../actions.js'

export const addDietItem = data => {
    return {
        type: ADD_DIET_ITEM,
        data
    }
}

export const addSupplementItem = data => {
    return {
        type: ADD_SUPPLEMENT_ITEM,
        data
    }
}
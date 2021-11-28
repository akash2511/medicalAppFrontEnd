import {
    ADD_DIET_ITEM,
    ADD_SUPPLEMENT_ITEM,
    ADD_SELECTED_MEDICINE_ITEM,
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

export const addSelectedMedicine = data => {
    return {
        type: ADD_SELECTED_MEDICINE_ITEM,
        data
    }
}
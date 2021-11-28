import {
    ADD_DIET_ITEM,
    ADD_SUPPLEMENT_ITEM,
    ADD_SELECTED_MEDICINE_ITEM,
    APP_LOGOUT
} from '../actions'

const initialState = {
    diet:[],
    supplement:[],
    selectedMedicine:{}
}

export const uiData = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DIET_ITEM:
            return Object.assign({}, state, {
                diet:action.data
            })
        case ADD_SELECTED_MEDICINE_ITEM:
            return Object.assign({}, state, {
                selectedMedicine:action.data
            })
        case ADD_SUPPLEMENT_ITEM:
            return Object.assign({}, state, {
                supplement: action.data
            })
        case APP_LOGOUT:
            return Object.assign({}, state, initialState)
        default:
            return state
    }
}

export const getAddedDiet = state => state.uiData.diet
export const getAddedSupplement = state => state.uiData.supplement
export const getSelectedMedicine = state => state.uiData.selectedMedicine

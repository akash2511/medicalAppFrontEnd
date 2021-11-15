import {
    ADD_DIET_ITEM,
    ADD_SUPPLEMENT_ITEM
} from '../actions'

const initialState = {
    diet:[],
    supplement:[]
}

export const uiData = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DIET_ITEM:
            return Object.assign({}, state, {
                diet:action.data
            })
        case ADD_SUPPLEMENT_ITEM:
            return Object.assign({}, state, {
                supplement: action.data
            })
        default:
            return state
    }
}

export const getAddedDiet = state => state.uiData.diet
export const getAddedSupplement = state => state.uiData.supplement

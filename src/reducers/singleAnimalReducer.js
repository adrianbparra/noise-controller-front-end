import * as actionTypes from '../actions';

const initialState = {
    animalSelected: {},
    showUpdate: false
};

export const singleAnimalReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SINGLE_ANIMAL:
            return { ...state, animalSelected: action.payload, showUpdate: false };
        case actionTypes.TOGGLE_UPDATE_ANIMAL:
            return { ...state, showUpdate: !state.showUpdate };
        default:
            return state;
    }
};
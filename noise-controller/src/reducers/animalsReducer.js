import * as actionTypes from '../actions';

const initialState = {
    animals: [],
    gettingAnimals: false,
    updatingAnimal: false,
    creatingAnimal: false,
    deletingAnimal: false,
    error: null
};

export const animalsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GETTING_ANIMALS:
            return { ...state, gettingAnimals: true };
        case actionTypes.GET_ANIMALS:
            return { ...state, animals: action.payload, gettingAnimals: false };
        case actionTypes.UPDATING_ANIMAL:
            return { ...state, updatingAnimal: true };
        case actionTypes.UPDATE_ANIMAL:
            return { ...state, animals: action.payload, updatingAnimal: false };
        case actionTypes.DELETING_ANIMAL:
            return { ...state, deletingAnimal: true };
        case actionTypes.DELETE_ANIMAL:
            return { ...state, animals: action.payload, deletingAnimal: false };
        case actionTypes.CREATING_ANIMAL:
            return { ...state, creatingAnimal: true };
        case actionTypes.CREATE_ANIMAL:
            return { ...state, animals: action.payload, creatingAnimal: false };
        case actionTypes.ERROR:
            return {
        ...state,
        gettingAnimals: false,
        creatingAnimal: false,
        deletingAnimal: false,
        updatingAnimal: false,
        error: action.payload
    };
    default:
        return state;
    }
};

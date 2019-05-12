import * as actionTypes from './actionTypes'

const PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: 0.7
}

export default (state = {
    ingredients: { salad: 0, meat: 0, cheese: 0, bacon: 0 },
    totalPrice: 4
}, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
                totalPrice: state.totalPrice + PRICES[action.ingredient]
            }

        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                },
                totalPrice: state.totalPrice - PRICES[action.ingredient]
            }

        default:
            return state;
    }
}
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const firstState = {
  ingredients: null,
  totalPrice: 2,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  lettuce: 0.5,
  cheese: 0.75,
  meat: 1.5,
  bacon: 0.75,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngred = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngreds = updateObject(state.ingredients, updatedIngred);
  const updatedStates = {
    ingredients: updatedIngreds,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedStates);
};

const setIngredients = (state, action) => {
  const ingr = {
    ingredients: {
      lettuce: action.ingredients.lettuce,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 2,
    error: false,
    building: false
  };
  return updateObject(state, ingr);
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
};
// array-like in an object will overwrite an props in a given object
const reducer = (state = firstState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);

    default:
      return state;
  }
};

export default reducer;

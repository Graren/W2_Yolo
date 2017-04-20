import { combineReducers } from 'redux';
import * as types from '../types';

const dish = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_DISH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const dishes = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.GET_DISHES_SUCCESS:
      if (action.data) return action.data;
      return state;
    case types.CREATE_DISH_SUCCESS:
      return [...state, dish(undefined, action)];
    case types.CREATE_DISH_FAILURE:
      return state.filter(t => t.id !== action.id);
    case types.DESTROY_DISH:
      return state.filter(t => t._id !== action.id);
    default:
      return state;
  }
};

const restaurantReducer = combineReducers({
  dishes,
});

export default restaurantReducer;

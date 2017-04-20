/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from '../types';

polyfill();

export function makeDishRequest(method, id, data, api = '/api/dish') {
  return request[method](api + (id ? ('/' + id) : ''), data);
}

export function destroy(id) {
  return { type: types.DESTROY_DISH, id };
}

export function getDishesRequest(restaurant) {
  return {
    type: types.GET_DISHES_REQUEST,
    restaurant,
  };
}

/*
 * @param data
 * @return a simple JS object
 */
export function createDishRequest(data) {
  return {
    type: types.CREATE_DISH_REQUEST,
    name: data.name,
    price: data.price
  };
}

export function createDishSuccess(data) {
  return {
    type: types.CREATE_DISH_SUCCESS,
    payload: data
  };
}

export function getDishesSuccess(data) {
  return {
    type: types.GET_DISHES_SUCCESS,
    data,
  };
}

export function getDishesFailure(error) {
  return {
    type: types.GET_DISHES_FAILURE,
    error,
  };
}

export function createDishFailure(data) {
  return {
    type: types.CREATE_DISH_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function createDish(data) {
  return (dispatch) => {
    dispatch(createDishRequest(data));
    return makeDishRequest('post', null, data)
      .then((res) => {
        if (res.status === 200) {
          return dispatch(createDishSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(createDishFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your topic'}));
      });
  };
}

export function getDishes(restaurant) {
  return (dispatch) => {
    dispatch(getDishesRequest(restaurant));
    return makeDishRequest('get', null, { params: { restaurant } })
      .then((res) => {
        if (res.status === 200) {
          return dispatch(getDishesSuccess(res.data));
        }
      })
      .catch(() => {
        return dispatch(getDishesFailure({ id, error: 'Oops! Something went wrong and we couldn\'t get dishes'}));
      });
  };
}

export function deleteDish(id) {
  return (dispatch) => {
    console.log(dispatch)
    return makeDishRequest('delete', id)
      .then(() => dispatch(destroy(id)))
      .catch(console.log);
  };
}

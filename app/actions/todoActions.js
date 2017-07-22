import * as types from './types.js';

export const addTodo = todo => ({
  type: types.ADD_TODO,
  payload: {
    todo,
  },
});

export const editTodo = (id, todo) => ({
  type: types.EDIT_TODO,
  payload: {
    id,
    todo,
  },
});

export const toggleTodo = id => ({
  type: types.TOGGLE_TODO,
  payload: {
    id,
  },
});

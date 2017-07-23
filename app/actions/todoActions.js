import * as types from './types.js';

export const editTodo = todo => ({
  type: types.EDIT_TODO,
  payload: {
    todo,
  },
});

export const toggleTodo = id => ({
  type: types.TOGGLE_TODO,
  payload: {
    id,
  },
});

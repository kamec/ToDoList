import * as types from '../actions/types.js';

class TodoItem {
  constructor(id, text, date, done = false) {
    this.id = id;
    this.text = text;
    this.date = date;
    this.done = done;
  }
}

const initialState = [
  new TodoItem(0, 'text', '23.07.17'),
  new TodoItem(1, 'text2', '23.07.17', true),
];

const getNextId = state =>
  state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;

function todos(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case types.EDIT_TODO:
      const { id, text, date } = payload.todo;
      return id === undefined
        ? [...state, new TodoItem(getNextId(state), text, date)]
        : state.map(
            todo =>
              todo.id === payload.todo.id ? { ...todo, ...payload.todo } : todo,
          );

    case types.TOGGLE_TODO:
      return state.map(
        todo => (todo.id === payload.id ? { ...todo, done: !todo.done } : todo),
      );

    default:
      return state;
  }
}

export default todos;

import * as types from '../actions/types.js';

class TodoItem {
  constructor(id, text, date, done = false) {
    this.id = id;
    this.text = text;
    this.date = date;
    this.done = done;
  }
}

let nextId = 0;

const initialState = [
  new TodoItem(nextId++, 'text', '23.07.17'),
  new TodoItem(nextId++, 'text2', '23.07.17', true),
];


function todos(state = initialState, action) {
  const payload = action.payload;
  switch (action.type) {
    case types.EDIT_TODO:
      const { id, text, date } = payload.todo;
      return id === undefined
        ? [...state, new TodoItem(nextId++, text, date)]
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

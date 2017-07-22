import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  ListView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
} from 'react-native-router-flux';

import TodoList from './app/components/TodoList.js';
import AddTodoModal from './app/components/AddTodoModal.js';
import reducer from './app/reducers/reducer.js';

const store = createStore(reducer);

export default class App extends Component {
  constructor(...args) {
    super(...args);
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root">
            <Scene
              key="todoList"
              component={TodoList}
              initial
              title="Todo list"
            />
            <Scene key="addTodo" component={AddTodoModal} title="Add Todo" />
          </Scene>
        </Router>
      </Provider>
    );
  }
}

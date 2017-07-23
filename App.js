import React, { Component } from 'react';
import { createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
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
import EditTodoModal from './app/components/EditTodoModal.js';
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
              initial
              lighthouse
              key="todoList"
              component={TodoList}
              title="Todo list"
            />
          <Scene key="editTodo" hideNavBar modal component={EditTodoModal}/>
          </Scene>
        </Router>
      </Provider>
    );
  }
}



import React, { Component } from 'react';
import { ListView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Scene, Router, Actions, Reducer, ActionConst } from 'react-native-router-flux';
import TodoList from './components/TodoList';

export default class App extends Component {
  constructor(...args) {
    super(...args);
  }
  componentWillMount = () => {
    // Actions.todoList();
    // Actions.refresh();
  }
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="todoList" component={TodoList} title="TodoList"/>
        </Scene>
      </Router>
    );
  }
}

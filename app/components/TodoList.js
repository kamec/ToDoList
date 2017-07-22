import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import TodoItem from './TodoItem';

export default class TodoList extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      onlyShowNotDone: false,
      todos: [],
    };
  }

  renderTodo(todo) {
    return (
      <TodoItem
        isLast={this.state.todos.indexOf(todo) === this.state.todos.length - 1}
        todo={todo}
        toggleTodo={this.toggleTodo.bind(this, todo)}
      />
    );
  }
  render() {
    const todos = this.state.todos.filter(todo => {
      if (this.state.onlyShowNotDone) {
        return !todo.done;
      }
      return true;
    });
    return (
      <View style={styles.container}>
        <View style={styles.options}>
          <TouchableOpacity
            onPress={() => Actions.addTodo()}
            style={styles.add}
          >
            <Text style={styles.text}>+ ADD A TODO</Text>
          </TouchableOpacity>
        </View>
        <ListView
          dataSource={this.state.dataSource.cloneWithRows(todos)}
          renderRow={this.renderTodo.bind(this)}
        />
        <View style={styles.hide}>
          <Text style={styles.text}>Hide done</Text>
          <Switch
            onValueChange={value => this.setState({ onlyShowNotDone: value })}
            value={this.state.onlyShowNotDone}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    marginTop: 40,
  },
  options: {
    flexDirection: 'column',
  },
  add: {
    padding: 10,
    alignItems: 'flex-end',
  },
  hide: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: 10,
  },
  text: {
    fontSize: 20,
  },
});

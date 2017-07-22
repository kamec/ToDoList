import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  TextInput,
  Button,
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

export default class AddTodoModal extends Component {
  constructor(...args) {
    super(...args);
    const { todo = {} } = args;
    this.state = {
      text: todo.text || '',
      date: todo.date || '24.07.2017',
    };
  }

  makeTodo(text, date, done) {
    return {
      done: done ? true : false,
      text: 'Todo item #',
    };
  }

  render() {
    return (
      <View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          value={this.state.text}
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          value={this.state.date}
        />
        <Button
          onPress={() => {
            this.props.addTodo(this.state);
            Actions.list();
            Actions.pop();
          }}
          title="ADD TODO"
          color="#841584"
          accessibilityLabel="ADD"
        />
      </View>
    );
  }
}

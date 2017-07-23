import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
import * as TodoActions from '../actions/todoActions.js';


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

const mapStateToProps = state => ({ todos: state.todos });
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch),
  dispatch,
});

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
      onlyShowNotDone: false,
      todos: props.todos,
    };
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({todos: nextProps.todos})
  }

  toggleTodo(todoId) {
    this.props.actions.toggleTodo(todoId);
  }

  renderTodo(todo) {
    return (
      <TodoItem
        isLast={this.state.todos.indexOf(todo) === this.state.todos.length - 1}
        todo={todo}
        toggleTodo={this.toggleTodo.bind(this, todo.id)}
      />
    );
  }
  render() {
    const todos = this.state.todos.filter(
      todo => (this.state.onlyShowNotDone ? !todo.done : true),
    );
    return (
      <View {...this.props} style={styles.container}>
        <View style={styles.options}>
          <TouchableOpacity
            onPress={() => Actions.editTodo()}
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

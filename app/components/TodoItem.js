import React, { Component } from 'react';
import { StyleSheet, View, Switch, Text, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
const deviceHeight = Math.max(height, width);
const deviceWidth = Math.min(height, width);

const styles = StyleSheet.create({
  todo: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 26,
    maxWidth: deviceWidth * 0.7,
  },
  date: {
    fontSize: 14,
  },
});

export default class TodoItem extends Component {
  render() {
    const { todo, toggleTodo } = this.props;
    const { id, text, date, done } = todo;

    return (
      <View style={styles.todo}>
        <View>
          <Text style={styles.text}>
            {text}
          </Text>
          <Text style={styles.date}>
            {date}
          </Text>
        </View>
        <Switch onValueChange={() => toggleTodo(todo)} value={done} />
      </View>
    );
  }
}

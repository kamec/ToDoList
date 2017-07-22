import React, { Component } from 'react';
import { StyleSheet, View, Switch, Text } from 'react-native';


export default class TodoItem extends Component {
  render() {
    const {isLast, todo, toggleTodo } = this.props;
    
    const styles = StyleSheet.create({
      todo: {
        backgroundColor: 'yellow',
        marginTop: 10,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        borderTopWidth: 2,
        borderBottomWidth: isLast ? 2 : 0,
        borderStyle: 'solid',
        borderColor: 'black',
      },
      text: {
        fontSize: 26
      }
    });
    
    const { id, text, done } = todo;
    return (
      <View style={styles.todo} key={id}>
          <View>
            <Switch onValueChange={() => toggleTodo(todo)} value={done}/>
          </View>
          <View>
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
    )
  }
}

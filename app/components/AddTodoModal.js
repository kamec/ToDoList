import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  TextInput,
  Button,
  Text,
  Animated,
  Dimensions,
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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as TodoActions from '../actions/todoActions.js';

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(TodoActions, dispatch),
  dispatch,
});

const { height, width } = Dimensions.get('window');
const deviceHeight = Math.max(height, width);
const deviceWidth = Math.min(height, width);

const styles = {
  modal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52,52,52,0.5)',
  },

  content: {
    height: deviceHeight * 0.4,
    width: deviceWidth * 0.8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: deviceWidth * 0.7,
  },

  input: {
    height: 40,
    width: deviceWidth * 0.4,
  },

  buttonWrapper: {
    marginBottom: deviceHeight * 0.1,
  },
};

class AddTodoModal extends Component {
  constructor(props) {
    super(props);
    const { todo = {} } = props;
    this.isFieldsEmpty = this.isFieldsEmpty.bind(this);
    this.handleCreateTodo = this.handleCreateTodo.bind(this);

    this.state = {
      text: todo.text || '',
      date: todo.date || '24.07.2017',
      offset: new Animated.Value(-deviceHeight),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: 0,
    }).start();
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 150,
      toValue: -deviceHeight,
    }).start(Actions.pop);
  }

  handleCreateTodo() {
    if (this.isFieldsEmpty()) {
      return;
    }
    this.props.actions.addTodo({
      text: this.state.text,
      date: this.state.date,
    });
    
    this.closeModal();
  }

  isFieldsEmpty() {
    return this.state.text === '' || this.state.date === '';
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.modal,
          { transform: [{ translateY: this.state.offset }] },
        ]}
      >
        <View style={styles.content}>
          <View style={styles.inputWrapper}>
            <Text>Description:</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text>Due date:</Text>
            <TextInput style={styles.input} value={this.state.date} />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              onPress={this.handleCreateTodo}
              color="#841584"
              title="ADD TODO"
              accessibilityLabel="add todo"
            />
          </View>
        </View>
      </Animated.View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoModal);

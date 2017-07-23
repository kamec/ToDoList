import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ListView,
  StyleSheet,
  TextInput,
  Button,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  DatePickerAndroid,
  View,
} from 'react-native';

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
    width: deviceWidth * 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

const isDateFormatValid = (year, month, day) =>
  year === undefined || month === undefined || day === undefined;

const toRussianDateLocale = (year, month, day) => {
  const date = isDateFormatValid(year, month, day)
    ? new Date()
    : new Date(year, month, day);
  return date.toLocaleDateString().replace(/(^\d{2})\/(\d{2})\//g, '$2.$1.');
};

class AddTodoModal extends Component {
  constructor(props) {
    super(props);
    const { todo = {} } = props;
    this.isFieldsEmpty = this.isFieldsEmpty.bind(this);
    this.handleCreateTodo = this.handleCreateTodo.bind(this);
    this.handleDate = this.handleDate.bind(this);

    this.state = {
      id: todo.id,
      text: todo.text || '',
      date: todo.date || toRussianDateLocale(),
      offset: new Animated.Value(-deviceHeight),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      duration: 100,
      toValue: 0,
    }).start();
  }

  closeModal() {
    Animated.timing(this.state.offset, {
      duration: 60,
      toValue: -deviceHeight,
    }).start(Actions.pop);
  }

  handleCreateTodo() {
    if (this.isFieldsEmpty()) {
      ToastAndroid.show('Please, fill all fields.', ToastAndroid.SHORT);
      return;
    }

    this.props.actions.editTodo({
      id: this.state.id,
      text: this.state.text,
      date: this.state.date,
    });

    this.closeModal();
  }

  isFieldsEmpty() {
    return this.state.text === '' || this.state.date === '';
  }

  handleDate() {
    DatePickerAndroid.open({
      date: new Date(),
    })
      .then(({ action, year, month, day }) => {
        if (action !== DatePickerAndroid.dissmisAction) {
          this.setState({ date: toRussianDateLocale(year, month, day) });
        }
      })
      .catch(({ code, message }) =>
        console.warn('Cannot open date picker', message),
      );
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
              value={this.state.text}
              onChangeText={text => this.setState({ text })}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text>Due date:</Text>
            <TextInput
              style={styles.input}
              value={this.state.date}
              onFocus={this.handleDate}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              onPress={this.handleCreateTodo}
              color="#841584"
              title="SAVE"
              accessibilityLabel="save"
            />
            <Button
              onPress={this.closeModal.bind(this)}
              color="#841584"
              title="BACK"
              accessibilityLabel="save"
            />
          </View>
        </View>
      </Animated.View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTodoModal);

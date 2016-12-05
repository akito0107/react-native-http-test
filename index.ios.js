/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react'
import {Provider, connect} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native'

const textArea = (state = {}, action) => {
  switch (action.type) {
    case 'EDIT_TEXT':
      return {
        ...state,
        text: action.text,
      }
    case 'SUBMIT_TEXT':
      return {
        ...state,
        text: '',
      }
    default:
      return state
  }
}

const store = createStore(combineReducers({
  textArea
}))

const editText = (text) => ({
  type: 'EDIT_TEXT',
  text,
})

const submitText = (text) => ({
  type: 'SUBMIT_TEXT',
  text,
})

const mapStateToProps = (state) => {
  return {
    inputValue: state.textArea.text,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeTextInput: (text) => {
      dispatch(editText(Text))
    },
    onSubmitTextInput: (text) => {
      dispatch(submitText(text))
    },
  }
}

const TextEdit = connect(
  mapStateToProps,
  mapDispatchToProps,
)(({ inputValue, onChangeTextInput, onSubmitTextInput }) => {
  return (
    <TextInput
      style={{height: 40}}
      placeholder="input something"
      onChangeText={(text) => onChangeTextInput(text)}
      onSubmitEditing={(text) => onSubmitTextInput(text)}
      value={inputValue}
    />
  )
})

const App = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to React Native!
    </Text>
    <Text style={styles.instructions}>
      To get started, edit index.ios.js
    </Text>
    <Text style={styles.instructions}>
      Press Cmd+R to reload,{'\n'}
      Cmd+D or shake for dev menu
    </Text>
    <TextEdit />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

export default class HttpTest extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('HttpTest', () => HttpTest);

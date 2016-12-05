/**
 * @flow
 */
import App from './redux/App'
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise'
import sensorMiddleware from './redux/middlewares/SensorMiddleware'
import text from './redux/reducers/text'
import sensor from './redux/reducers/sensor'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  DeviceEventEmitter,
} from 'react-native'

const store = createStore(combineReducers({
    text,
    sensor,
  }), { text: { textValue: 'initial' }, 
  sensor: { sensorValue: { x: 0, y: 0, z: 0 } } },
  applyMiddleware(promiseMiddleware, sensorMiddleware))

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

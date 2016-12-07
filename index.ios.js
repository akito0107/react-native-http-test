/**
 * @flow
 */
import App from './redux/App'
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise'
import sensorMiddleware from './redux/middlewares/SensorMiddleware'
import wsMiddleware from './redux/middlewares/WSMiddleware'
import text from './redux/reducers/text'
import sensor from './redux/reducers/sensor'
import websocket from './redux/reducers/websocket'
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
    websocket,
  }), {
    text: { textValue: 'initial' },
    sensor: { sensorValue: { x: 0, y: 0, z: 0 } },
    websocket: { message: 'blank' }
  },
  applyMiddleware(promiseMiddleware,
    sensorMiddleware({ interval: 0.1 }),
    wsMiddleware({ host: '192.168.0.11', port: 3000, path: '/ws' })
  ))

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

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
import headingMiddleware from './redux/middlewares/HeadingMiddleware'
import bleMiddleware from './redux/middlewares/BLEMiddleware'
import text from './redux/reducers/text'
import sensor from './redux/reducers/sensor'
import websocket from './redux/reducers/websocket'
import heading from './redux/reducers/heading'
import ble from './redux/reducers/ble'
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
    // sensor,
    websocket,
    ble,
  }), {
    text: { textValue: 'initial' },
    // sensor: { sensorValue: { acceleration: { x: 0, y: 0, z: 0 } } },
    websocket: { message: 'blank' },
    ble: { ble: {} }
  },
  applyMiddleware(promiseMiddleware,
    // sensorMiddleware({ interval: 0.1 }),
    wsMiddleware({ host: '192.168.0.22', port: 3000, path: '/ws' }),
    // wsMiddleware({ host: '172.26.35.53', port: 3000, path: '/ws' })
    bleMiddleware()
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

/**
 * @flow
 */

import {Accelerometer} from 'react-native-motion-manager'
import {DeviceEventEmitter} from 'react-native'
import {createAction} from 'redux-actions'

Accelerometer.setAccelerometerUpdateInterval(0.75) // in seconds
Accelerometer.startAccelerometerUpdates()
DeviceEventEmitter.addListener('AccelerationData', (data) => {
  console.log(data)
})

const updateSensor = createAction('UPDATE_SENSOR')

export default store => next => action => {
  return next(action)
}
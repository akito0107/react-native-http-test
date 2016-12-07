/**
 * @flow
 */

import {Accelerometer} from 'react-native-motion-manager'
import {DeviceEventEmitter} from 'react-native'
const util = require('util')

export function start() {
  return {
    type: 'MOTIONSENSOR',
    payload: {
      operation: 'start'
    }
  }
}

export function listen({listenerActions}) {
  return {
    type: 'MOTIONSENSOR',
    payload: {
      operation: 'listen',
      listenerActions
    }
  }
}

export function stop() {
  return {
    type: 'MOTIONSENSOR',
    payload: {
      operation: 'stop'
    }
  }
}

export default function sensorMiddleware({ interval = 0.1 }) {
  Accelerometer.setAccelerometerUpdateInterval(interval)
  
  return ({ dispatch }) => (next) => (action) => {
    if (action.type !== 'MOTIONSENSOR') {
      return next(action)
    }
    
    switch (action.payload.operation) {
      case 'start':
        console.log('called start')
        Accelerometer.startAccelerometerUpdates()
        break
      case 'listen':
        console.log('called listen')
        DeviceEventEmitter.addListener('AccelerationData', (data) => {
          console.log(`called update: ${util.inspect(data)}`)
          action.payload.listenerActions.forEach((listener) => {
            dispatch(listener(data))
          })
        })
        break
      case 'stop':
        Accelerometer.stopAccelerometerUpdates()
        break;
      default:
        return next(action)
    }
  }
}

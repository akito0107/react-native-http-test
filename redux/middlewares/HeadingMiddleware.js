/**
 * @flow
 */

import {DeviceEventEmitter} from 'react-native'
import ReactNativeHeading from 'react-native-heading'


export function start() {
  return {
    type: 'HEADINGSENSOR',
    payload: {
      operation: 'start'
    }
  }
}

export function stop() {
  return {
    type: 'HEADINGSENSOR',
    payload: {
      operation: 'stop'
    }
  }
}

export function listen({ listerAction }) {
  return {
    type: 'HEADINGSENSOR',
    payload: {
      operation: 'listen',
      listenerAction
    }
  }
}

export default function headingMiddleware({ interval = 0.1 }) {
  return ({dispatch}) => (next) => (action) => {
    if (action.type !== 'HEADINGSENSOR') return next(action)
   
    switch(action.payload.operation) {
      case 'start':
        console.log(ReactNativeHeading)
        ReactNativeHeading.start(1)
        break;
      case 'listen':
        DeviceEventEmitter.addListener('headingUpdated', data => {
          console.log('New heading is:', data.heading)
          action.payload.listenerActions.forEach((listener) => {
            dispatch(listener(data))
          })
        })
        break;
      case 'stop':
        ReactNativeHeading.stop();
        DeviceEventEmitter.removeAllListeners('headingUpdated');
        break;
    }
    
    return next(action)
  }
}

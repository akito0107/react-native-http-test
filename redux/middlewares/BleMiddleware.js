/**
 * @flow
 */

import BleManager from 'react-native-ble-manager'
import {createAction} from 'redux-actions'

export function start() {
  return {
    type: 'BLE',
    payload: {
      operation: 'start'
    }
  }
}

export function scan({ serviceUUIDs = [], seconds = 2, allowDuplicates = false }) {
  return {
    type: 'BLE',
    payload: {
      operation: 'scan',
      options: {
        serviceUUIDs,
        seconds,
        allowDuplicates,
      }
    }
  }
}

export function connect() {
  
}

export function close() {
  
}

export default function BleMiddleware() {
  return ({ dispatch }) => (next) => (action) => {
    if (action.type !== 'BLE') {
      return next(action)
    }
    console.log(action)
    
    switch (action.payload.operation) {
      case 'start':
        console.log('BLE called start')
        BleManager.start({ showAlert: false }).then(() => {
          console.log('BLE Initialized')
        })
        break
      case 'scan':
        console.log(`BLE called scan ${action}`)
        const { serviceUUIDs, seconds, allowDuplicates } = action.payload.options
        const action = createAction('BLE', async() => {
          const response = await BleManager.scan(serviceUUIDs, seconds, allowDuplicates)
          console.log(`BLE Scan: ${response}`)
          return {
            operation: 'scanData'
          }
        })
        dispatch(action());
        
        break
      case 'scanDone': {
        console.log('BLE scanDone')
        break
      }
      default:
        break
    }
    
    return next(action)
  }
}

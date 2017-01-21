/**
 * @flow
 */

import BleManager from 'react-native-ble-manager'
import {createAction} from 'redux-actions'
import {NativeAppEventEmitter} from 'react-native'

export function start() {
  return {
    type: 'BLE',
    payload: {
      operation: 'start'
    }
  }
}

export function scan({ serviceUUIDs = [], seconds = 10, allowDuplicates = false }) {
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

export function connect({
  peripheralId = '4760F313-FD05-6435-7C63-A51D6885FD85',
  serviceUUID = '00050000-6727-11E5-988E-F07959DDCDFB',
  characteristicUUID = '00050001-6727-11E5-988E-F07959DDCDFB',
}) {
  return {
    type: 'BLE',
    payload: {
      operation: 'connect',
      options: {
        peripheralId,
        serviceUUID,
        characteristicUUID
      }
    }
  }
  
}

export function close() {
  
}

export default function BleMiddleware() {
  return ({ dispatch }) => (next) => (action) => {
    if (action.type !== 'BLE') {
      return next(action)
    }
    
    var payload = action.payload
    console.log(action)
    switch (payload.operation) {
      case 'start': {
        console.log(`BLE called start ${action}`)
        BleManager.start({ showAlert: false }).then(() => {
          console.log('BLE Initialized')
        })
        break
      }
      case 'scan': {
        console.log(`BLE called scan ${action}`)
        const { serviceUUIDs, seconds, allowDuplicates } = payload.options
        const action = createAction('BLE', async() => {
          await BleManager.scan(serviceUUIDs, seconds, allowDuplicates)
          const peripherals = await BleManager.getDiscoveredPeripherals()
          console.log(`BLE Scan: ${peripherals}`)
          return {
            operation: 'scanDone',
            peripherals
          }
        })
        console.log(action.toString())
        dispatch(action());
        break
      }
      
      case 'scanDone': {
        console.log(`BLE scanDone: ${payload.peripherals}`)
        const blueNinja = payload.peripherals.filter((p) => p.name === 'HyouRowGan00')
        if (blueNinja.length === 0) break
        const action = createAction('BLUENINJA_DISCOVERED')
        dispatch(action(blueNinja[0]))
        break
      }
      
      case 'connect': {
        console.log('BLE CONNECT')
        const { peripheralId, serviceUUID, characteristicUUID } = payload.options
        const action = createAction('BLE', async() => {
          try {
            console.log('hoge')
            console.log(peripheralId)
            const info = await BleManager.connect(peripheralId)
            console.log('BLE CONNECT DONE' + info)
          } catch (e) {
            console.error(e)
          }
          NativeAppEventEmitter.addListener(
            'BleManagerConnectPeripheral',
            (peripheralId) => {
              console.log('hoge ' + peripheralId)
            }
          )
          
          try {
            await BleManager.startNotification(peripheralId, serviceUUID, characteristicUUID)
          } catch (e) {
            console.error(e)
          }
          NativeAppEventEmitter.addListener(
            'BleManagerDidUpdateValueForCharacteristic',
            (args) => {
              console.log(args)
              const action = createAction('UPDATE_BLUENINJA')
              dispatch(action(args))
            }
          )
          
          return {
            operation: 'connectDone'
          }
        })
        dispatch(action())
        break;
      }
      default: {
        break
      }
    }
    
    return next(action)
  }
}

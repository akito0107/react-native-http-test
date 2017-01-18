/**
 * @flow
 */

import {BleManager} from 'react-native-ble-plx'
import promiseToCallback from 'promise-to-callback'

export function startScan({ uuid, options, listener }) {
  return {
    type: 'BLE',
    payload: {
      operation: 'startScan',
      uuid,
      options,
      listener,
    }
  }
}

export function stopScan({}) {
}

export function connectDevice({ deviceUuid, options, listener }) {
  return {
    type: 'BLE',
    payload: {
      operation: 'startScan',
      deviceUuid,
      options,
      listener,
    }
  }
}

export function discoverAll({ deviceUuid, listener }) {
  return {
    type: 'BLE',
    payload: {
      operation: 'discoverAllServicesAndCharacteristicsForDevice',
      deviceUuid,
      listener,
    }
  }
}

export function disconnect({}) {
}

export default function BLEMiddleware() {
  const manager = new BleManager()
  console.log(`manager: ${manager.onStateChange.toString()}`)
  manager.onStateChange((newState) => {
    console.log(`manager.onstateChange; ${newState}`)
  })
  return ({ dispatch }) => (next) => (action) => {
    if (action.type !== 'BLE') {
      return next(action)
    }
    
    switch (action.payload.operation) {
      case 'destroy': {
        manager.destroy()
        break
      }
      case 'startScan': {
        const { listener, uuids, options } = action.payload
        //if (manager.state() !== 'PoweredOn') {
        //  dispatch(listener(new Error('Not Available')))
        //  break
        //}
        //manager.state().then((state) => {
        //  console.log(`startScan state: ${manager.state()}`)
        manager.startDeviceScan(uuids || null, options || null, (err, device) => {
          console.log(`startDeviceScan: scanned: err: ${err}, device: ${device}`)
          dispatch(listener(device))
        })
        //})
        
        break
      }
      case 'stopScan': {
        manager.stopDeviceScan()
        break
      }
      case 'connectDevice': {
        const { deviceUuid, listener } = action.payload
        promiseToCallback(manager.connectToDevice(deviceUuid))((err, device) => {
          console.log(`connectDevice: conencted: ${device}`)
          dispatch(listener(err, device))
        })
        break
      }
      case 'discoverAllServicesAndCharacteristicsForDevice': {
        const { deviceUuid } = action.payload
        promiseToCallback(manager.discoverAllServicesAndCharacteristicsForDevice(deviceUuid))((err, res) => {
          console.log('---------------')
          console.log(err)
          console.log(res)
          console.log('---------------')
        })
        break
      }
      default: {
        break
      }
    }
    
    next(action)
  }
}

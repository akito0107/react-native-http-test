/**
 * @flow
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import BleArea from '../components/BleArea'
import {start, scan, connect as connectNinja} from '../middlewares/BleMiddleware'

const mapStateToProps = (state) => {
  return {
    blueninja: state.ble.blueninja,
    sensorValue: {
      first: state.ble.updatedDevice.first,
      second: state.ble.updatedDevice.second
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStartButtonPressed: () => {
      dispatch(start())
    },
    onScanButtonPressed: () => {
      dispatch(scan({}))
    },
    onConnectButtonPressed: (opts) => {
      console.log('onconnect', opts)
      dispatch(connectNinja(opts))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BleArea)

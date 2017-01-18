/**
 * @flow
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createAction} from 'redux-actions'
import BleArea from '../components/BleArea'
import {connectDevice, startScan, discoverAll} from '../middlewares/BLEMiddleware'

const onScan = createAction('ON_SCAN')
const onConnect = createAction('ON_CONNECT')

const mapStateToProps = (state) => {
  return {
    device: state.ble
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onScanButtonPressed: () => {
      dispatch(startScan({ listener: onScan }))
    },
    onConnectButtonPressed: ({ deviceUuid }) => {
      dispatch(connectDevice({ deviceUuid, listener: onConnect }))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BleArea)

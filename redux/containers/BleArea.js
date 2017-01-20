/**
 * @flow
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import BleArea from '../components/BleArea'
import {start, scan} from '../middlewares/BleMiddleware'

const mapStateToProps = (state) => {
  return {
    wsMessage: state.websocket.event
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStartButtonPressed: () => {
      dispatch(start())
    },
    onScanButtonPressed: () => {
      dispatch(scan({}))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BleArea)

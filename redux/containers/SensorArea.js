/**
 * @flow
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import SensorArea from '../components/SensorArea'
import {start, listen} from '../middlewares/SensorMiddleware'
import {createAction} from 'redux-actions'
import {send} from '../middlewares/WSMiddleware'

const updateSensor = createAction('UPDATE_SENSOR')

const mapStateToProps = (state) => {
  return {
    sensorValue: state.sensor.sensorValue
  }
}

const wrappedSend = (message) => {
  return send({message})
}

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonPressed: () => {
      dispatch(start())
      dispatch(listen({ listenerActions: [updateSensor, wrappedSend] }))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SensorArea)
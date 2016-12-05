/**
 * @flow
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import SensorArea from '../components/SensorArea'

const mapStateToProps = (state) => {
  return {
    sensorValue: state.sensor.sensorValue
  }
}

//const mapDispatchToProps = (dispatch) => {
//}

export default connect(
  mapStateToProps,
  //mapDispatchToProps,
)(SensorArea)
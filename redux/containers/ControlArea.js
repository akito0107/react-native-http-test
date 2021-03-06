/**
 * @flow
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {send} from '../middlewares/WSMiddleware'
import ControlArea from '../components/ControlArea'


const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonPressed: (id) => {
      dispatch(
        send({
          message: {
            id
          }
        }))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ControlArea)

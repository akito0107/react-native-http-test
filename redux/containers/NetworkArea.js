/**
 * @flow
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createAction} from 'redux-actions'
import NetworkArea from '../components/NetworkArea'
import {open} from '../middlewares/WSMiddleware'

const onMessage = createAction('WS_RECV_MESSAGE')

const mapStateToProps = (state) => {
  return {
    wsMessage: state.websocket.event
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonPressed: () => {
      dispatch(open({handlerAction: onMessage}))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworkArea)

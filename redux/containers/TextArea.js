/**
 * @flow
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import TextArea from '../components/TextArea'
import {createAction} from 'redux-actions'

const editText = createAction('EDIT_TEXT')
const submitText = createAction('SUBMIT_TEXT', async text => {
  return await fetch('http://192.168.0.11:3080/ping')
})

const mapStateToProps = (state) => {
  return {
    inputValue: state.text.textValue,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeTextInput: (text) => {
      dispatch(editText(text))
    },
    onSubmitTextInput: (text) => {
      dispatch(submitText(text))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextArea)
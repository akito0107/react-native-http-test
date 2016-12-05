/**
 * @flow
 */
import {
  TextInput,
} from 'react-native'
import React, {Component} from 'react'

const TextArea = ({ inputValue, onChangeTextInput, onSubmitTextInput }) => {
  return (
    <TextInput
      style={{height: 40}}
      placeholder="input something"
      onChangeText={onChangeTextInput}
      onSubmitEditing={onSubmitTextInput}
      value={inputValue}
    />
  )
}

export default TextArea

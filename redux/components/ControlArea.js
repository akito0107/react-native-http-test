/**
 * @flow
 */
import {
  View,
  Text,
} from 'react-native'
import React, {Component} from 'react'
import Button from 'react-native-button';

const ControlArea = ({ onButtonPressed }) => {
  return (
    <View>
     <Button
        containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
        style={{fontSize: 20, color: 'green'}}
        onPress={() => {
          onButtonPressed(1)
        }}
      >
       Blink1!
      </Button>
      <Button
        containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
        style={{fontSize: 20, color: 'green'}}
        onPress={() => {
          onButtonPressed(2)
        }}
      >
       Blink2!
      </Button>
    </View>
  )
}

export default ControlArea

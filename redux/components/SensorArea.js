/**
 * @flow
 */
import {
  View,
  Text,
} from 'react-native'
import React, {Component} from 'react'
import Button from 'react-native-button';

const SensorArea = ({ sensorValue, onButtonPressed }) => {
  return (
    <View>
      <Text>{sensorValue.x}</Text>
      <Text>{sensorValue.y}</Text>
      <Text>{sensorValue.z}</Text>
      <Button
        containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
        style={{fontSize: 20, color: 'green'}}
        onPress={onButtonPressed}
      >
        start
      </Button>
    </View>
  )
}

export default SensorArea
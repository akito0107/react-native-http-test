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
      <Text>acceleration</Text>
      <Text>{sensorValue.acceleration.x}</Text>
      <Text>{sensorValue.acceleration.y}</Text>
      <Text>{sensorValue.acceleration.z}</Text>
      <Text></Text>
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

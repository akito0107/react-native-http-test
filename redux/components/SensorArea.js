/**
 * @flow
 */
import {
  View,
  Text,
} from 'react-native'
import React, {Component} from 'react'

const SensorArea = ({ sensorValue }) => {
  return (
    <View>
      <Text>{sensorValue.x}</Text>
      <Text>{sensorValue.y}</Text>
      <Text>{sensorValue.z}</Text>
    </View>
  )
}

export default SensorArea

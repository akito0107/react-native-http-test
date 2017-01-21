import {View, Text} from 'react-native'
import React, {Component} from 'react'
import Button from 'react-native-button'

const BleArea = ({ blueninja, sensorValue, onStartButtonPressed, onScanButtonPressed, onConnectButtonPressed }) => {
  return (
    <View>
      <Button
        containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'white' }}
        style={{ fontSize: 20, color: 'green' }}
        onPress={onStartButtonPressed}
      >
        start
      </Button>
      <Button
        containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'white' }}
        style={{ fontSize: 20, color: 'green' }}
        onPress={onScanButtonPressed}
      >
        scan
      </Button>
      <Text>id {blueninja.id}</Text>
      <Text>name {blueninja.name}</Text>
      <Text>rssi {blueninja.rssi}</Text>
      <Button
        containerStyle={{ padding: 10, height: 45, overflow: 'hidden', borderRadius: 4, backgroundColor: 'white' }}
        style={{ fontSize: 20, color: 'green' }}
        onPress={() => {
          onConnectButtonPressed({ peripheralId: blueninja.id })
        }}
          >
          connect
          </Button>
      <Text>{sensorValue.first}</Text>
      <Text>------------------</Text>
      <Text>{sensorValue.second}</Text>
          </View>
          )
        }
        
        export default BleArea

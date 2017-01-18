/**
 * @flow
*/

import {View, Text} from 'react-native'
import React, {Component} from 'react'
import Button from 'react-native-button'

const BleArea = ({device, onScanButtonPressed, onConnectButtonPressed})  => {
  return (
    <View>
      <Button
        containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
        style={{fontSize: 20, color: 'green'}}
        onPress={onScanButtonPressed}
      >
        scan
      </Button>
    </View>
  )
}

export default BleArea
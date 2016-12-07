/**
 * @flow
*/ 

import {View, Text} from 'react-native'
import React, {Component} from 'react'
import Button from 'react-native-button'

const NetworkArea = ({wsMessage, onButtonPressed})  => {
  return (
    <View>
      <Text>{wsMessage}</Text>
      <Button
        containerStyle={{padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
        style={{fontSize: 20, color: 'green'}}
        onPress={onButtonPressed}
      >
        connect
      </Button>
    </View>
  )
}

export default NetworkArea
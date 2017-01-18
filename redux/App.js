/**
 * @flow
 */
import NetworkArea from './containers/NetworkArea'
import ControlArea from './containers/ControlArea'
import BleArea from './containers/BleArea'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native'
import React, {Component} from 'react'

const App = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to ExampleApp!
    </Text>
    <ControlArea />
    <NetworkArea />
    <BleArea />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

export default App

/**
 * @flow
 */
import NetworkArea from './containers/NetworkArea'
import BleArea from './containers/BleArea'
import ControlArea from './containers/ControlArea'
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
      Blink1 => 1号機点灯
    </Text>
    <Text style={styles.welcome}>
      Blink2 => 2号機点灯
    </Text>
    <Text style={styles.welcome}>
      connect => サーバに接続
    </Text>
    <Text style={styles.welcome}>
      使い方: connect => Blink1 or Blink2
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

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Button, Text, Left, Body, Right, Title, Icon } from 'native-base';

import Echo from "laravel-echo/dist/echo";
import Pusher from "pusher-js/react-native";

import { Buffer } from 'buffer';

import { RNSerialport } from 'react-native-serialport'
import {DeviceEventEmitter} from 'react-native'

export default class App extends Component {
  constructor() {
      super()
      this.state = {
        value: '未找到裝置',
        data: txtArray,
      };
      var txtArray = new Array();
      var pusher = new Pusher('myKey', {
        cluster: 'mt1',
        key: 'myKey',
        wsHost: 'ws01.hkict.com',
        wsPort: 2052,
        disableStats: true,
      });
      // window.Echo = new Echo({
      //   broadcaster: 'pusher',
      //   key: 'myKey',
      //   client: pusher
      // });
  }
  onUsbAttached() { 
    this._getDeviceList() 
  }
  onUsbDetached() {alert('USB装置分离')}
  onUsbNotSupperted() {alert('USB装置不支持')}
  onError(error) {alert('码: ' + error.errorCode + ' 信息: ' +error.errorMessage)}
  onConnectedDevice() {alert('USB装置已接上')}
  onDisconnectedDevice() {alert('USB装置已断开')}
  onServiceStarted() {alert('服务开始')}
  onServiceStopped() {alert('服务停止')}
  onReadData(data) {
    var string = new Buffer(data , 'hex').toString('utf8');
    this.state.data.concat(data)
      // alert(string)
  }
  sendText = () => {
    console.warn('writeString');
    RNSerialport.writeString("X");
  }
  findDevice = () => {
    alert('getDeviceList');
    RNSerialport.getDeviceList((response) => {
      console.warn(response);
    });
  }
  componentDidMount() {
    DeviceEventEmitter.addListener('onServiceStarted', this.onServiceStarted, this)
    DeviceEventEmitter.addListener('onServiceStopped', this.onServiceStopped,this)
    DeviceEventEmitter.addListener('onDeviceAttached', this.onUsbAttached, this)
    DeviceEventEmitter.addListener('onDeviceDetached', this.onUsbDetached, this)
    DeviceEventEmitter.addListener('onDeviceNotSupported', this.onUsbNotSupperted, this)
    DeviceEventEmitter.addListener('onError', this.onError, this)
    DeviceEventEmitter.addListener('onConnected', this.onConnectedDevice, this)
    DeviceEventEmitter.addListener('onDisconnected', this.onDisconnectedDevice, this)
    DeviceEventEmitter.addListener('onReadDataFromPort', this.onReadData, this)
   
    //Added listeners
    RNSerialport.setAutoConnectBaudRate(19200);
    RNSerialport.setAutoConnect(false);
    RNSerialport.setDataBit(8);
    RNSerialport.setStopBit(1);
    RNSerialport.startUsbService();
  }
  componentWillMount() {
      DeviceEventEmitter.removeAllListeners()
  }
  _getDeviceList() {
    RNSerialport.getDeviceList((response) => {
      if(!response.status) {
        alert('码: ' + response.errorCode + ' 信息: ' +response.errorMessage)
        return
      } 
      alert(response.devices)
      let deviceName = response.devices[0].name
      let baudRate = 19200
  
      RNSerialport.connectDevice(deviceName, baudRate)
    })
  }
  render() {
   
    return (
      <Container>
        <Header>
        <Left>
           <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>测试APP</Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={styles.content}>
          <Text>{this.state.data}</Text>
          <Button onPress={this.findDevice} style={styles.button} primary><Text> 搜寻装置 </Text></Button>
          <Button onPress={this.sendText} style={styles.button} primary><Text> 发送指令 </Text></Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  header: {
      paddingRight: 15,
      paddingLeft: 15
  },
  content: {
      display: "flex",
      alignItems: 'center',
      flex: 1,
      justifyContent: "center",
      padding: 15
  },
  button: {
    alignSelf:'center',
    marginTop:20,
  }
});
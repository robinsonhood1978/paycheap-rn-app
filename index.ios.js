import MyApp from './App'
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import React from 'react'
import * as WeChat from 'react-native-wechat';

class IosApp extends React.Component {
  // If you register here
  componentDidMount() {
    WeChat.registerApp('wx660ef07ece9f73b3');
  }
  render() {
    return (
      <MyApp />
    );
  }
}

AppRegistry.registerComponent(appName, () => IosApp);
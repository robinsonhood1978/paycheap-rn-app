import React from 'react'
import { Root ,Container} from "native-base";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import {Image} from 'react-native';
import { Provider ,connect} from 'react-redux'
import store from './src/store/index'

import LoadingGlobalOpacity from './src/components/loadingGlobalOpacity'
import OrderPage from './src/screen/order'
import StorePage from './src/screen/restaurant'
import HomePage from './src/screen/user'

console.disableYellowBox = true;

const BottomTabNavigator = createBottomTabNavigator(
  {
    Store: {
      screen: StorePage,
      navigationOptions: {
        tabBarIcon: ({focused}) =>focused?  <Image source={require("./src/static/img/shouyecaise.png")} style={{ width: 20, height: 20 }}/>: <Image source={require("./src/static/img/shouye.png")} style={{ width: 20, height: 20 }}/>
      }
    },
    Order: {
      screen: OrderPage,
      navigationOptions: {
        tabBarIcon: ({focused}) =>focused?<Image source={require("./src/static/img/dingdancaise.png")} style={{ width: 20, height: 20 }}/>: <Image source={require("./src/static/img/dingdan.png")} style={{ width: 20, height: 20}}/>
      }
    },
    Home: {
      screen: HomePage,
      navigationOptions: {
        tabBarIcon: ({focused}) =>focused?<Image source={require("./src/static/img/gerenzhongxincaise.png")} style={{ width: 20, height: 20 }}/>: <Image source={require("./src/static/img/gerenzhongxin.png")} style={{ width: 20, height: 20 }}/>
      }
    },
  }, 
  {
    initialRouteName: "Store",
    tabBarOptions: {
      inactiveTintColor: "#666",
      activeTintColor: '#ff6933',
      labelStyle: {
        fontSize: 10,
        marginTop:-3
      },
      showIcon: true,
    }
  }
);
const NavigationPage = createAppContainer(BottomTabNavigator);

class MyRootPage extends React.Component {
  render(){
    const {globalLoading}=this.props;
    return <Root><Container><LoadingGlobalOpacity loading={globalLoading} />
    <NavigationPage/></Container></Root>
  }
}

const ConnectRootPage= connect(state=>state.globalLoading)(MyRootPage)

export default class MyApp extends React.Component {
    render() {
    return (
      <Provider store={store}><ConnectRootPage/></Provider>
    );
  }
}
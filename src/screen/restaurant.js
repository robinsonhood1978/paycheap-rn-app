import { createStackNavigator } from "react-navigation";
import StoreList from './Restaurant/index'
import StoreDetail from './Restaurant/store'
import Product from './Restaurant/product';
import Confirm from './Restaurant/confirmPayIn'
import Pay from './Restaurant/pay.js'
import SearchStore from './Restaurant/searchStore'
import Category from './Restaurant/category'
import AllComments from './Restaurant/allComments'
import Scan from './Restaurant/scan'
import UseApp from './Restaurant/useApp'
import { defaultNavigationOptions   } from '../utils/utils'

const AppNavigator = createStackNavigator(
  {
    StoreList,
    StoreDetail,
    Product,
    Confirm,
    Pay,
    SearchStore,
    Category,
    AllComments,
    Scan,
    UseApp,
  }, {
    initialRouteName: "StoreList",
    defaultNavigationOptions
  }
);
AppNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

export default AppNavigator


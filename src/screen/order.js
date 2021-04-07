import { createStackNavigator } from "react-navigation";
import OrderList from './Order/index'
import OrderDetail from './Order/order'
import Comment from './Order/comment'
import { defaultNavigationOptions   } from '../utils/utils'

const AppNavigator = createStackNavigator(
  {
    OrderList,
    OrderDetail,
    Comment
  }, {
    initialRouteName: "OrderList",
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
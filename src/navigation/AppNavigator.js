import { createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import DrawerNavigator from './DrawerNavigator';
import AuthScreen from '../screens/AuthScreen';
import SignUpScreen from '../screens/SignUpScreen';
 
const AuthStack = createStackNavigator(
  {
    Login: AuthScreen,
    Registrieren: SignUpScreen
  },
  { //headerMode: 'none',
  }
);

export default createAppContainer(
  createSwitchNavigator({
    Auth: AuthStack,
    Drawer: DrawerNavigator
  },
  {
    initialRouteName: 'Auth'
  })
);

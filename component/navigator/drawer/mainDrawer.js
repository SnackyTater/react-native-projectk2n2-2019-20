import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

//import custom drawer
import customDrawer from './mainCustomDrawer';

//import general-use component
import studentNav from '../stackNav/studentNav';


const DrawerNavigator = createDrawerNavigator({
  studentNav: {
    screen: studentNav
  },

}, {
  gestureEnabled: false,
  drawerLockMode: 'locked-closed',
  contentComponent: customDrawer,
  drawerWidth: 300
});

export default createAppContainer(DrawerNavigator);
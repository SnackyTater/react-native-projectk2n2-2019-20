import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

//import custom drawer
import customDrawer from './mainCustomDrawer';

import studentNav from '../stackNav/studentNav';
import teacherNav from '../stackNav/teacherNav'


const DrawerNavigator = createDrawerNavigator({
  studentNav: {
    screen: studentNav
  },
  teacherNav: {
    screen: teacherNav
  }
}, {
  gestureEnabled: false,
  drawerLockMode: 'locked-closed',
  contentComponent: customDrawer,
  drawerWidth: 300
});

export default createAppContainer(DrawerNavigator);
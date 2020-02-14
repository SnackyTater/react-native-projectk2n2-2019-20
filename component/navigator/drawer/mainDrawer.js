import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

//import custom drawer
import customDrawer from './customDrawer';

//import general-use component
import loginNav from '../stackNav/studentLoginNav';

//import student only component
import studentProfile from '../../views/student/profile';
import studentResult from '../../views/student/result';
import studentSchedule from '../../views/student/schedule';
import studentSchoolSchedule from '../../views/student/schoolSchedule';

//import teacher only component


const DrawerNavigator = createDrawerNavigator({
  Login: {
    screen: loginNav
  },
  studentProfile: {
    screen: studentProfile
  },
  studentResult: {
    screen: studentResult
  },
  studentSchedule: {
    screen: studentSchedule
  },
  studentSchoolSchedule: {
      screen: studentSchoolSchedule
  },
}, {
  gestureEnabled: false,
  drawerLockMode: 'locked-closed',
  contentComponent: customDrawer,
  drawerWidth: 300
});

export default createAppContainer(DrawerNavigator);
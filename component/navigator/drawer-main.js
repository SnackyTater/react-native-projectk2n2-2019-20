import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import subDrawer from './drawer-sub';
import Profile from '../views/profile';
import Login from '../views/login';
import Result from '../views/result';
import Schedule from '../views/schedule';
import schoolSchedule from '../views/schoolSchedule';
import Loading from '../views/loading'


const DrawerNavigator = createDrawerNavigator({
  Login: {
    screen: Login
  },
  Profile: {
    screen: Profile
  },
  Result: {
    screen: Result
  },
  Schedule: {
    screen: Schedule
  },
  schoolSchedule: {
      screen: schoolSchedule
  },
  loading: {
    screen: Loading
  }
}, {
  contentComponent: subDrawer,
  drawerWidth: 300
});

export default createAppContainer(DrawerNavigator);
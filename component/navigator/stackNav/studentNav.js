import { createStackNavigator } from 'react-navigation-stack';

import Login from '../../views/general/login';
import studentProfile from '../../views/student/profile';
import studentResult from '../../views/student/result';
import studentSchedule from '../../views/student/schedule';
import studentSchoolSchedule from '../../views/student/schoolSchedule';
import drawer from '../drawer/mainCustomDrawer'

const studentNav = createStackNavigator({
  Login: {
    screen: Login
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
  drawer: {
    screen: drawer
  }
},{
  headerMode: 'none'
})

export default studentNav;
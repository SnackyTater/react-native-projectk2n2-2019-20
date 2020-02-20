import { createStackNavigator } from 'react-navigation-stack';

import Login from '../../views/general/login';
import teacherProfile from '../../views/teacher/profile';
import teacherResult from '../../views/teacher/result';
import teacherSchedule from '../../views/teacher/schedule';
import teacherSchoolSchedule from '../../views/teacher/schoolSchedule';

const teacherNav = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    teacherProfile:{
      screen: teacherProfile
    },
    teacherResult: {
      screen: teacherResult
    },
    teacherSchedule: {
    screen: teacherSchedule
    },
    teacherSchoolSchedule: {
      screen: teacherSchoolSchedule
    }
  },{
    headerMode: 'none'
})

export default teacherNav;
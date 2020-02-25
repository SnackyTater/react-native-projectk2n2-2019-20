import { createStackNavigator } from 'react-navigation-stack';

import Login from '../../component/views/general/login';
import teacherProfile from '../../component/views/teacher/profile';
import teacherResult from '../../component/views/teacher/result';
import teacherSchedule from '../../component/views/teacherr/schedule';
import teacherSchoolSchedule from '../../component/views/teacher/schoolSchedule';

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
    },
  },{
    headerMode: 'none'
})

export default teacherNav;
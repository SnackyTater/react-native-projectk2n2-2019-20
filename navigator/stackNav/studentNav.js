import { createStackNavigator } from 'react-navigation-stack';

import Login from '../../component/views/general/login';
import studentProfile from '../../component/views/student/profile';
import studentRegister from '../../component/views/student/register';
import studentResult from '../../component/views/student/result';
import studentSchedule from '../../component/views/student/schedule';
import studentSchoolSchedule from '../../component/views/student/schoolSchedule';

const studentNav = createStackNavigator({
  Login: {
    screen: Login
  },
  studentProfile: {
    screen: studentProfile
  },
  studentRegister: {
    screen: studentRegister
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
},{
  headerMode: 'none'
})

export default studentNav;
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../../views/general/login';
import teacherProfile from '../../views/teacher/Profile';

const scheduleNav = createStackNavigator({
    Login: {
      screen: Login
    },
    Profile:{
      screen: teacherProfile
    }
  },{
    headerMode: 'none'
})

export default scheduleNav;
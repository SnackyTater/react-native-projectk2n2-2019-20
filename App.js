import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './component/login';
import Profile from './component/profile';

const rootStack = createStackNavigator({
  Home: { screen: Login },
  Profile: { screen: Profile },
  }, {
    navigationOptions: {
      header: false
    }
  }
);

const Application = createAppContainer(rootStack);

export default class App extends React.Component {
  render() {
    return (
      <Application />
    );
  }
}
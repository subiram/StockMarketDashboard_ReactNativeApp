import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './redux/store';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './components/DashboardScreen';
import Top20StackScreen from './components/Top20StackScreen';
import StockDetailScreen from './components/StockDetailScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Dashboard" component={DashboardTabNavigator} />
          <Stack.Screen name="StockDetail" component={StockDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const DashboardTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MostActive" component={DashboardScreen} />
      <Tab.Screen name="Top20" component={Top20StackScreen} />
    </Tab.Navigator>
  );
};

export default App;


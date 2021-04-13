import React from 'react';
import Login from './src/pages/Login.jsx';
import Register from './src/pages/Register.jsx';
import Home from './src/pages/Home.jsx';
import AddSubscription from './src/pages/AddSubscription';
import LandingPage from './src/pages/LandingPage.jsx';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="LandingPage"
      screenOptions={{
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Register" 
        component={Register} 
        options={
          { title: 'Register' },
          {headerShown: false}
      }
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login'},
          {headerLeft: null},
          {headerShown: false}
        }
      />
      <Stack.Screen 
       name="AddSubscription" 
       component={AddSubscription} 
       options={
         { title: 'AddSubscription' },
         {headerLeft: null},
         {headerShown: false}
       }
      />
      <Stack.Screen 
       name="Home" 
       component={Home} 
       options={
         { title: 'Home' },
         {headerLeft: null},
         {headerShown: false}
       }
      />
      <Stack.Screen 
       name="LandingPage" 
       component={LandingPage} 
       options={
         { title: 'LandingPage' },
         {headerLeft: null} ,
         {headerShown: false}
       }
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

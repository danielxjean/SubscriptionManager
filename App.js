import React, { useEffect, useState } from 'react';
import Login from './src/pages/Login.jsx';
import Register from './src/pages/Register.jsx';
import Settings from './src/pages/Settings.jsx';
import Menu from './src/pages/Menu.jsx';
import Home from './src/pages/Home.jsx';
import AddSubscription from './src/pages/AddSubscription';
import Profile from './src/pages/Profile';
import UpcomingPayments from './src/pages/UpcomingPayments';
import LandingPage from './src/pages/LandingPage.jsx';
import Statistics from './src/pages/Statistics';
import ManageSubscriptions from './src/pages/ManageSubscriptions';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {decode, encode} from 'base-64';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { db,firebase } from './database/firebase';
import { View,ScrollView, Button } from 'react-native';
import {Text, Title} from "react-native-paper";
import { MaterialCommunityIcons } from 'react-native-vector-icons';

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();
const MenuStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator()

function MenuStackScreen() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen
        name="Menu"
        component={Menu}
        options={{ tabBarLabel: 'Menu!' }}
      />
      {/* <MenuStack.Screen
        name="Settings"
        component={Settings}
        options={{ tabBarLabel: 'Settings!' }}
      /> */}
      <MenuStack.Screen
        name="AddSubscription"
        component={AddSubscription}
        options={{ tabBarLabel: 'AddSubscription!' }}
      />
      <MenuStack.Screen
        name="UpcomingPayments"
        component={UpcomingPayments}
        options={{ tabBarLabel: 'UpcomingPayments!' }}
      />
      <MenuStack.Screen
        name="ManageSubscriptions"
        component={ManageSubscriptions}
        options={{ tabBarLabel: 'ManageSubscriptions!' }}
      />
    </MenuStack.Navigator>
  );
}
export default function App() {

  const [loading, setLoading] = useState(true);
  // const [userLogged, setUserLogged] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
          // setUserLogged(user ? true : false);
        usersRef.doc(user.uid).get()
          .then((document) => {
            const userData = document.data()
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
            // setUserLogged(false);
          });
      } else {
        setLoading(false);
        // setUserLogged(false);
      }
    });
  }, []);

  if (loading) {
    return (
      // Todo: Add a loading screen or animation
        <View>
            <Text>Loading</Text>
        </View>

    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
            <>
            <Stack.Screen
              name="Home"
              component={MainTabNavigator}
              options={
                { title: 'Home' },
                {headerLeft: null},
                {headerShown: false}
              }
              />
            </>
        ) : (
          <>
            <Stack.Screen
              name="LandingPage"
              component={LandingPage}
              options={
                { title: 'Landing Page' },
                {headerLeft: null},
                {headerShown: false}
              }
            />
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MainTabNavigator() {
  return(
      <Tab.Navigator
        initialRouteName="Home"
        shifting={true}
        sceneAnimationEnabled={true}
        activeColor="white"
        barStyle={{ backgroundColor: "#30444E", borderTopColor: '#30444E', borderTopWidth: 10}}
      >
        <Tab.Screen 
            name='Menu' 
            component={MenuStackScreen}
            options={{
                tabBarLabel: 'Menu',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="menu" color={color} size={26} />
                ),
              }}
        />
        <Tab.Screen
            name='Home'
            component={Home}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }}
        />
        <Tab.Screen 
            name='Profile'
            component={Profile}
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="account" color={color} size={26} />
                ),
              }}
        />
      </Tab.Navigator>
  );
}
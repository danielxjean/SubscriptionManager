//import React from 'react';
//import Login from './src/pages/Login.jsx';
//import Register from './src/pages/Register.jsx';
//import Home from './src/pages/Home.jsx';
//import AddSubscription from './src/pages/AddSubscription';
//import LandingPage from './src/pages/LandingPage.jsx';
//import { createStackNavigator } from "@react-navigation/stack";
//import { NavigationContainer } from '@react-navigation/native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import {Text, Title} from "react-native-paper";
//import {View, ScrollView} from 'react-native';
//
//const Stack = createStackNavigator();
//const Tab = createBottomTabNavigator();
//
//const TabNavigator = () => {
//    return(
//        <Tab.Navigator>
//            <Tab.Screen name="Home" component={Home}/>
//            <Tab.Screen name="AddSubscription" component={AddSubscription}/>
//
//        </Tab.Navigator>
//    )
//}
//
//function MyStack() {
//  return (
//    <Stack.Navigator initialRouteName="LandingPage"
//      screenOptions={{
//        headerTintColor: '#fff',
//        headerTitleStyle: {
//          fontWeight: 'bold',
//        },
//      }}>
//      <Stack.Screen name="Register" component={Register}
//        options={
//          { title: 'Register' },
//          {headerShown: false}
//      }
//      />
//      <Stack.Screen name="Login" component={Login}
//        options={
//          {title: 'Login'},
//          {headerLeft: null},
//          {headerShown: false}
//        }
//      />
//      <Stack.Screen name="AddSubscription" component={AddSubscription}
//       options={
//         { title: 'AddSubscription' },
//         {headerLeft: null},
//         {headerShown: false}
//       }
//      />
//      <Stack.Screen name="Home" component={Home}
//       options={
//         { title: 'Home' },
//         {headerLeft: null},
//         {headerShown: false}
//       }
//      />
//      <Stack.Screen name="LandingPage" component={LandingPage}
//       options={
//         { title: 'LandingPage' },
//         {headerLeft: null} ,
//         {headerShown: false}
//       }
//      />
//
//    </Stack.Navigator>
//  );
//};
//
//const App = () => {
//    return (
////            <Stack.Navigator
////                initialRouteName="LandingPage"
////                screenOptions={{
////                headerTintColor: '#fff',
////                headerTitleStyle: {
////                fontWeight: 'bold',
////                },}}
////            >
////            <Stack.Screen name="TabNavigator" component={TabNavigator} />
////
////            <Stack.Screen name="LandingPage" component={LandingPage}
////                options={
////                { title: 'LandingPage' },
////                {headerLeft: null} ,
////                {headerShown: false}
////                }
////            />
////            </Stack.Navigator>
//
//            <NavigationContainer>
//                  <MyStack />
//            </NavigationContainer>
//    );
//};
//
//
//export default App;

import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TabBar from './src/components/TabBar';
import LandingPage from './src/pages/LandingPage.jsx';
import AddSubscription from './src/pages/AddSubscription';
import Home from './src/pages/Home.jsx';
import Login from './src/pages/Login.jsx';
import Register from './src/pages/Register.jsx';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{swipeEnabled: false}} >
        <Drawer.Screen name="StackNavigator" component={StackNavigator} />
        <Drawer.Screen name="DrawerOption" component={DrawerOption} />
        <Drawer.Screen name="AddSubscription" component={AddSubscription} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const PlaceholderComponent = () => {
  return (
    <></>
  )
}

const StackNavigator = () => <Stack.Navigator initialRouteName="LandingPage">
                                <Stack.Screen name="LandingPage" component={LandingPage} />
                                <Stack.Screen name="TabNavigator" component={TabNavigator} />
                                <Stack.Screen name="AddSubscription" component={AddSubscription} />
                                <Stack.Screen name="Register" component={Register} />
                                <Stack.Screen name="Login" component={Login} />
                              </Stack.Navigator>

const DrawerOption = () => <View style={styles.container}>
                              <Text>DRAWER OPTION</Text>
                              <StatusBar style="auto" />
                            </View>

const TabNavigator = () => <Tab.Navigator tabBar={props => <TabBar {...props}/>}>
                              <Tab.Screen name="OpenOption" component={PlaceholderComponent} />
                              <Tab.Screen name="Home" component={Home}
                              options={{
                                        tabBarLabel: 'Home',
                                        tabBarIcon: ({ color, size }) => (
                                          <Entypo name="home" color={color} size={size} />
                                        ),
                                      }}
                              />
                              <Tab.Screen name="AddSubscription" component={AddSubscription} />
                            </Tab.Navigator>



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});






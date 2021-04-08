import React from "react";
import { Text, View, Alert } from 'react-native';
import {Header} from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './Settings';
import Subscriptions from './Subscriptions';

const Tab = createBottomTabNavigator();

const addSubscription = () => 
  Alert.alert("Button for adding Subscriptions (TODO!");

  const logout = () =>
  Alert.alert("Button for log out (TODO)!");

export default function Home() {
        return(
          <View>
            <Header
              leftComponent={{ icon: 'add', color: '#fff', onPress: () => addSubscription() }}
              centerComponent={{ text: 'Subscription Manager', style: { color: '#fff' } }}
              rightComponent={{ text: 'Logout', style: { color: '#fff' }, onPress: () => logout() }}
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Hello world!</Text>
            </View>
            <Tab.Navigator>
              <Tab.Screen name="Subscriptions" component={Subscriptions} />
              <Tab.Screen name="Settings" component={Settings} />
            </Tab.Navigator>
          </View>
          
        );
}



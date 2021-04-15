import React, { useEffect, useState } from 'react'

import { FlatList, Keyboard, Text, Alert, TextInput,StatusBar, TouchableOpacity, View, StyleSheet } from 'react-native';
import {Header} from 'react-native-elements';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Card, Title, Paragraph, Headline} from 'react-native-paper';
import TabBar from '../components/TabBar.jsx';

// import tings from './Settings';
// import Subscriptions from './Subscriptions';
// import Menu from './Menu';

// const Tab = createBottomTabNavigator();

const addSubscription = () =>
Alert.alert("Button for adding Subscriptions (TODO!");

const manageSubscription = () =>
Alert.alert("Button for managing Subscriptions (TODO!");

const statistics = () =>
Alert.alert("Button for statistics (TODO!");

const upcomingPayments = () =>
Alert.alert("Button for upcomingPayments (TODO!");

const logout = () =>
Alert.alert("Button for log out (TODO)!");


export default function Home(effect, deps) {
  const backgroundColor='#FFC542';
 useEffect(()=>{
   StatusBar.setBarStyle( 'light-content',true)
   StatusBar.setBackgroundColor(backgroundColor)
  }, [])

  const [entityText, setEntityText] = useState('');

        return(
          <View>
            {/*<Header*/}
            {/*  leftComponent={{ icon: 'add', color: '#fff', onPress: () => addSubscription() }}*/}
            {/*  centerComponent={{ text: 'Subscription Manager', style: { color: '#fff' } }}*/}
            {/*  rightComponent={{ text: 'Logout', style: { color: '#fff' }, onPress: () => logout() }}*/}
            {/*  containerStyle={{*/}
            {/*    backgroundColor: '#1A282F',*/}
            {/*    justifyContent: 'space-around',*/}
            {/*  }}*/}
            {/*    />*/}


            <View style = {{ backgroundColor: backgroundColor, height: '100%'}}>

                <Card style={styles.monthlyCard}>
                  <Card.Content>
                    <Title style={{textAlign:"center"}}>Monthly Cost</Title>
                    <Headline style={{textAlign:"center"}}>123$</Headline>
                  </Card.Content>
                </Card>

              <Card style={styles.buttonCard}>
                <Card.Content>
                <TouchableOpacity style={styles.button} onPress={addSubscription}>
                    <Text style={styles.buttonText}>Add Subscription</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={manageSubscription}>
                    <Text style={styles.buttonText}>Manage Subscriptions</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={statistics}>
                    <Text style={styles.buttonText}>Statistics</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={upcomingPayments}>
                    <Text style={styles.buttonText}>Upcoming Payments</Text>
                </TouchableOpacity>

                </Card.Content>

              </Card>

            </View>

            {/*<Tab.Navigator>*/}
            {/*        <Tab.Screen name="Subscriptions" component={Subscriptions}  />*/}
            {/*        <Tab.Screen name="Settings" component={Settings} />*/}
            {/*        <Tab.Screen name="Menu" component={Menu} />*/}
            {/*  </Tab.Navigator>*/}


          </View>



        );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#30444E"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  },
  buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
    color: "white"

  },
  button: {
    height: 48,
    overflow: 'hidden',
    backgroundColor: '#40DF9F',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30
 },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#1A282F',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
  },
  monthlyCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 40,
    marginBottom: 50,
    marginLeft: 30,
    marginRight: 30
  },
  buttonCard: {
    borderRadius: 20,
    overflow: 'hidden',
    height:'100%',
    backgroundColor: '#2A3C44'
  }
});
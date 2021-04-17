import React, { useEffect, useState } from 'react'

import { FlatList, Keyboard, Text, Alert, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import {Header} from 'react-native-elements';
import { Card, Title, Paragraph } from 'react-native-paper';
import { firebase } from '../../database/firebase';

const addSubscription = () => 
Alert.alert("Button for adding Subscriptions (TODO!");

const manageSubscription = () => 
Alert.alert("Button for managing Subscriptions (TODO!");

const statistics = () => 
Alert.alert("Button for statistics (TODO!");

const upcomingPayments = () => 
Alert.alert("Button for upcomingPayments (TODO!");

const logout = () => {
  Alert.alert('logging out'); 
  firebase.auth().signOut();
}



export default function Home() {

  const [entityText, setEntityText] = useState('');

        return(
          <View>
            <Header
              leftComponent={{ icon: 'add', color: '#fff', onPress: () => addSubscription() }}
              centerComponent={{ text: 'Subscription Manager', style: { color: '#fff' } }}
              rightComponent={{ text: 'Logout', style: { color: '#fff' }, onPress: () => logout() }}
              containerStyle={{
                backgroundColor: '#1A282F',
                justifyContent: 'space-around',
              }}
                />

            <View style = {{ backgroundColor: '#1A282F', height: '80%'}}>

                <Card>
                  <Card.Content style={styles.card}>
                    <Title>Monthly Cost</Title>
                    <Paragraph>123$</Paragraph>
                  </Card.Content>
                </Card>

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
            </View>
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
    color: "white",
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
    marginRight: 30,
    paddingLeft: 16     
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
  card: {
    height: 48,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFC542',
    marginTop: 40,
    marginBottom: 50,
    marginLeft: 15,
    marginRight: 30,
    textAlign: "center",
    paddingBottom: 20
  }
});

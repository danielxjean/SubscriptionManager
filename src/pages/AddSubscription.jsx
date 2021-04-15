import React, { useState } from "react";
import { View, Text, TextInput,StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Dropdown } from 'react-native-material-dropdown-v2';
import {Header} from 'react-native-elements';
import TabBar from '../components/TabBar';

export default function AddSubscription() {
  let category = [
    {
      value: 'Entertainment'
    },
    {
      value: 'Streaming Services'
    },
    {
      value: 'Bills'
    },
  ];

  const addSubscription = () => 
  Alert.alert("Button for adding Subscriptions (TODO!");

  const [paymentDate, setPaymentDate] = useState('');
  const [monthlyCost, setMonthlyCost] = useState('');
  const [subscriptionName, setSubscriptionName] = useState('');

  return(
    // <View>
      // <Header centerComponent={{ text: 'Add Subscription', style: { color: '#fff' } }} />
      <View style={{ flex: 1, justifyContent: 'center', width: '100%', backgroundColor: '#2A3C44'}}>
        <TextInput
            style={styles.input}
            placeholder='Subscription name'
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setSubscriptionName(text)}
            value={subscriptionName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholder='Monthly cost'
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setMonthlyCost(text)}
            value={monthlyCost}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
        />
          <TextInput
              style={styles.input}
              placeholder='Payment date'
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setPaymentDate(text)}
              value={paymentDate}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
          />
          <Dropdown 
            placeholder = "Category"
            data = {category}
            style = {styles.dropdown}
            placeholderTextColor = "#aaaaaa"
            selectedItemColor	 = "#aaaaaa"
          />
          <TouchableOpacity style={styles.button} onPress={addSubscription}>
              <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>

      </View>

    // </View>

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
    backgroundColor: "#1A282F"
  },
  buttonText: {
    paddingTop: 12,
    textAlign: "center",
    color: "white",
    fontSize: 15
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
 dropdown: {
  height: 48,
  overflow: 'hidden',
  backgroundColor: '#1A282F',
  borderWidth: 1,
  borderRadius: 5,
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
});

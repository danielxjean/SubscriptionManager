import React, { useState } from "react";
import { View, Text, TextInput,StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Dropdown } from 'react-native-material-dropdown-v2';
import { Header, Button } from 'react-native-elements';
import DateTimePicker  from  '@react-native-community/datetimepicker';
import firebase from '../../database/firebase';

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

  // firebase.firestore()

  const [paymentDate, setPaymentDate] = useState(new Date());
  const [monthlyCost, setMonthlyCost] = useState('');
  const [subscriptionName, setSubscriptionName] = useState('');


  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || paymentDate;
    setShow(Platform.OS === 'android');
    setPaymentDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };


  return(
    <View>
      <View style={{ paddingTop: 225, backgroundColor: '#2A3C44', height: '100%'}}>

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
            keyboardType = 'numeric'
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setMonthlyCost(text)}
            value={monthlyCost}
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
          <View style={{flexDirection:'row'}}>

              <TextInput
                  style={styles.inputDate}
                  placeholder={paymentDate.toDateString()}
                  placeholderTextColor="#aaaaaa"
                  // onChangeText={paymentDate.toDateString()} // paymentDate.toDateString()
                  value={paymentDate.toDateString()}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  onPress = {showDatepicker}
              />

              <Button
                  onPress={showDatepicker}
                  title="Date"
                  buttonStyle={styles.buttonDate}
              />

          </View>

          {show && (<DateTimePicker
            testID="dateTimePicker"
            value={paymentDate}
            mode='date'
            display="calendar"
            onChange={onChange}
            placeholder= "Category"
          />
          )}

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
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    height: 52,
    overflow: 'hidden',
    backgroundColor: '#40DF9F',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16     
 },
 buttonDate: {
  height: 48,
  overflow: 'hidden',
  backgroundColor: '#1A282F',
  opacity: 0.5,
  borderWidth: 1,
  borderColor: '#1A282F',
  borderRadius: 15,
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 30,
  marginRight: 30,
  paddingLeft: 16,
  width: '40%'
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
  marginBottom: 15,
  marginLeft: 30,
  marginRight: 30,
  paddingLeft: 16
},
inputDate: {
  height: 48,
  borderRadius: 5,
  overflow: 'hidden',
  backgroundColor: '#1A282F',
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 30,
  marginRight: 0,
  paddingLeft: 16,
  width: '50%',
},
});

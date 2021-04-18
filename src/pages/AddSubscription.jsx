import React, { useState } from "react";
import {ScrollView, View, Text, TextInput,StyleSheet, TouchableOpacity, Alert } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';
import { Button } from 'react-native-elements';
import DateTimePicker  from  '@react-native-community/datetimepicker';
import { firebase } from '../../database/firebase';

export default function AddSubscription() {

  const currentUser = firebase.auth().currentUser;

  const addSubscription = () => {
    const subscription = {
      Service: subscriptionName,
      packages: parseInt(monthlyCost),
      Category: category,
      Date: paymentDate
    };

    let services = null

    const db = firebase.firestore().collection('users').doc(currentUser.uid).get()
    .then(snap => {
      if (!snap.exists) {
        console.log('No such document!');``
        return;
      }

      services = snap.data()
      const s = services.services
      if (typeof s === 'undefined') {
        firebase.firestore().collection('users').doc(currentUser.uid).update({services: [subscription]})
      } else {
        s.push(subscription)
        services.services = [...s]

        firebase.firestore().collection('users').doc(currentUser.uid).set(services)
        console.log(services)
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  }

  const [paymentDate, setPaymentDate] = useState(new Date());
  const [monthlyCost, setMonthlyCost] = useState('');
  const [subscriptionName, setSubscriptionName] = useState('');
  const [category, setCategory] = useState('');

  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || paymentDate;
    setShow(Platform.OS === 'ios');
    setPaymentDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };


  return(
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{ flex: 1, justifyContent: 'center', width: '100%', backgroundColor: '#30444E'}}>
        <Text style={styles.text}>
          Add Subscription
        </Text>
        <TextInput
            style={styles.input}
            placeholder='Subscription name'
            placeholderTextColor="white"
            onChangeText={(text) => setSubscriptionName(text)}
            value={subscriptionName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholder='Monthly cost'
            keyboardType = 'numeric'
            placeholderTextColor="white"
            onChangeText={(text) => setMonthlyCost(text)}
            value={monthlyCost}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
        />

        <ModalDropdown
            options={['Entertainment', 'Music', 'Gaming','Other']}
            style={styles.dropdown}
            onSelect={(text) => setCategory(text)}
            textStyle={{color:'white'}}
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
              titleStyle={{color:'white'}}
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
      </ScrollView>
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
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 60
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
    marginBottom: 30,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    borderColor: 'black'
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
    width: '40%',
    borderColor: 'black'
  },
  dropdown: {
    height: 48,
    overflow: 'hidden',
    backgroundColor: '#1A282F',
    borderWidth: 1,
    borderRadius: 5,
    paddingTop: 15,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    color: 'white'
  },
  input: {
    height: 48,
    borderRadius: 5,
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: '#1A282F',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    color: 'white',
    borderColor: 'black'
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
    color: 'white'
  },
});

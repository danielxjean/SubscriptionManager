import React, { useState } from "react";
import {ScrollView, View, Text, TextInput,StyleSheet, TouchableOpacity, Alert } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';
import { Button } from 'react-native-elements';
import DateTimePicker  from  '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { RadioButton } from 'react-native-paper';
import { firebase } from '../../database/firebase';

export default function AddSubscription({navigation}) {
  const currentUser = firebase.auth().currentUser;
  const [value, setValue] = React.useState(true);
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [monthlyCost, setMonthlyCost] = useState('');
  const [subscriptionName, setSubscriptionName] = useState('');
  const [category, setCategory] = useState('');
  const [packages, setPackages] = useState([10]);
  const [show, setShow] = useState(false);

  const setDropDownPackages= (serviceName) =>{
    console.log(serviceName)
    if(serviceName==0) {
      setSubscriptionName("Netflix")
      setPackages([9.99 , 14.99 , 18.99 ])
      setCategory(0)
    }
    if(serviceName==1) {
      setSubscriptionName("Amazon Prime")
      setPackages([3.99 , 7.99 ])
      setCategory(3)
    }
    if(serviceName==2) {
      setSubscriptionName("Spotify")
      setPackages([4.99,9.99 ])
      setCategory(1)
    }
    if(serviceName==3) {
      setSubscriptionName("Hulu")
      setPackages([5.99,11.99,64.99])
      setCategory(0)
    }
    if(serviceName==4) {
      setSubscriptionName("Disney+")
      setPackages([11.99])
      setCategory(0)
    }
    if(serviceName==5) {
      setSubscriptionName("Crave")
      setPackages([9.99,9.99 +5.99,9.99 +9.99,9.99 +9.99+5.99,9.99 +9.99+9.99,9.99 +9.99+9.99 +5.99])
      setCategory(0)
    }
    if(serviceName==6) {
      setSubscriptionName("Apple Tv")
      setPackages([5.99 ])
      setCategory(0)
    }
    if(serviceName==7) {
      setSubscriptionName("Apple Music")
      setPackages([4.99 ,9.99,14.99])
      setCategory(1)
    }
    if(serviceName==8) {
      setSubscriptionName("Xbox")
      setPackages([1,9.99,11.99,14.99 ])
      setCategory(2)
    }
    if(serviceName==9) {
      setSubscriptionName("PS+")
      setPackages([11.99])
      setCategory(2)
    }
    if(serviceName==10) {
      setSubscriptionName("PSNow")
      setPackages([9.99 ])
      setCategory(2)
    }
    if(serviceName==10) {
      setSubscriptionName("Nintendo Online")
      setPackages([3.99 ])
      setCategory(2)
    }
    if(serviceName==11) {
      setSubscriptionName("Google Stadia")
      setPackages([9.99 ])
      setCategory(2)
    }
    if(serviceName==12) {
      setSubscriptionName("Chegg")
      setPackages([14.95 ,19.95 ])
      setCategory(3)
    }
    setMonthlyCost(0)
  }

  const setChosenPackage = (choice)=>setMonthlyCost(packages[choice]);


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
        console.log('No such document!');
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
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

    navigation.navigate('Menu');
  }

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
          New Subscription Service
        </Text>
        <View style={{flexDirection:"row",justifyContent: 'center',alignItems:'center'}}>
        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
          <View style={{flex:1}}>
            <Text style={{color:"white"}}>Registerd Services</Text>
            <RadioButton value={true} />
          </View>
          <View style={{flex:1}}>
            <Text style={{color:"white"}}>Custom Services</Text>
            <RadioButton value={false} />
          </View>
        </RadioButton.Group>
        </View>
        {value?
            <ModalDropdown
                options={['Netflix', 'Amazon Prime', 'Spotify','hulu','Disney+','Crave','Apple TV','Apple Music','Xbox','PS+','PSNow','Nintendo Online','Google Stadia','Chegg']}
                defaultValue='Subscription name'
                style={styles.dropdown}
                onSelect={(text) => setDropDownPackages(text) }
                textStyle={{color:'white'}}
            />
            :
        <TextInput
            style={styles.input}
            placeholder='Subscription name'
            placeholderTextColor="white"
            onChangeText={(text) => setSubscriptionName(text)}
            value={subscriptionName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
        />
        }
        {value ?
            <ModalDropdown
                options={packages}
                defaultValue='Monthly cost'
                style={styles.dropdown}
                onSelect={(text) => setChosenPackage(text)}
                textStyle={{color:'white'}}
            />
            :
        <TextInput
            style={styles.input}
            placeholder='Monthly cost'
            keyboardType='numeric'
            placeholderTextColor="white"
            onChangeText={(text) => setMonthlyCost(text)}
            value={monthlyCost}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
        />
        }
        {!value &&
          <ModalDropdown
          options={['Entertainment', 'Music', 'Gaming','Other']}
          defaultValue='Category'
          style={styles.dropdown}
          onSelect={(text) => setCategory(text)}
          textStyle={{color:'white'}}
          />
        }



        <View style={{flexDirection:'row'}}>

          <TextInput
              style={styles.inputDate}
              placeholder={paymentDate.toDateString()}
              placeholderTextColor="#aaaaaa"
              value={paymentDate.toDateString()}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              onPress = {showDatepicker}
          />

          <TouchableOpacity
              onPress={showDatepicker}
              style={styles.buttonDate}
          >
            <LinearGradient
                style={{flex:1}}
                colors={['#9FC6FF', '#6993FF', '#516AC2']}
                height={'100%'}>
            <Text style={styles.buttonText}>Date</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>

        {show && (
            <DateTimePicker
                testID="dateTimePicker"
                value={paymentDate}
                mode='date'
                display="calendar"
                onChange={onChange}
                placeholder= "Category"
            />
        )}

        <TouchableOpacity style={styles.button} onPress={addSubscription}>
          <LinearGradient
              style={{flex:1}}
              colors={['#9FC6FF', '#6993FF', '#516AC2']}
              height={'100%'}>
          <Text style={styles.buttonText}>Add</Text>
          </LinearGradient>
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
    height: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30
  },
  buttonDate: {
    height: 48,
    overflow: 'hidden',
    backgroundColor: '#1A282F',
    borderWidth: 1,
    borderColor: '#1A282F',
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    width: '25%',
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

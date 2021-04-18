import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Keyboard,
  Text,
  Alert,
  TextInput,
  StatusBar,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import {Header} from 'react-native-elements';
import { firebase,db } from '../../database/firebase';
import {Card, Title, Paragraph, Headline} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Statistics from "./Statistics";


export default function Home({navigation}) {
  const [entityText, setEntityText] = useState('');
  const [Sum, setSum] = useState(0);
  const backgroundColor='#2A3C44';
 useEffect(()=>{
   if (Platform.OS == 'android') {
     StatusBar.setBarStyle('light-content', true)
     StatusBar.setBackgroundColor("#2A3C44")
   }
   _fetchSum();
  }, [Sum])

  const _fetchSum = async () =>{

    var docRef = db.collection("users").doc("test1");

    docRef.get().then((doc) => {
      if (doc.exists) {
        let currSum=0;
        const UserInfo=doc.data().services
        console.log(UserInfo);
        for(var i=0;i<UserInfo.length;i++)
          currSum+=UserInfo[i].packages
        setSum(currSum)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }
  const addSubscription = () =>
      navigation.navigate('AddSubscription');

  const manageSubscription = () =>
      Alert.alert("Button for managing Subscriptions (TODO!");

  const statistics = () =>
      navigation.navigate('Statistics');

  const upcomingPayments = () =>
      Alert.alert("Button for upcomingPayments (TODO!");

  const logout = () => {
    Alert.alert('logging out');
    firebase.auth().signOut();
  }
        return(
          <ScrollView>
            <View style = {{ backgroundColor: backgroundColor, height: '100%'}}>

                <Card style={styles.monthlyCard}>
                  <Card.Content>
                    <Title style={{textAlign:"center"}}>Monthly Cost</Title>
                    <Headline style={{textAlign:"center"}}>{Sum}$</Headline>
                  </Card.Content>
                </Card>
              <Statistics/>
              <Card style={styles.buttonCard}>
                <Card.Content>
                <TouchableOpacity style={styles.button} onPress={addSubscription}>
                  <LinearGradient
                    // Button Linear Gradient
                    colors={['#9FC6FF', '#6993FF', '#516AC2']}
                    height={'100%'}>
                    <Title style={styles.buttonText}>Add Subscription</Title>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={manageSubscription}>
                  <LinearGradient
                      // Button Linear Gradient
                      colors={['#9FC6FF', '#6993FF', '#516AC2']}
                      height={'100%'}>
                    <Title style={styles.buttonText}>Manage Subscriptions</Title>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={upcomingPayments}>
                  <LinearGradient
                      // Button Linear Gradient
                      colors={['#9FC6FF', '#6993FF', '#516AC2']}
                      height={'100%'}>
                    <Title style={styles.buttonText}>Upcoming Payments</Title>
                  </LinearGradient>
                </TouchableOpacity>

                </Card.Content>

              </Card>

            </View>
          </ScrollView>
          
        );

}


const styles = StyleSheet.create({

   footer: {
    zIndex: 999
   },
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
    justifyContent: 'center',
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
    backgroundColor:"#9FC6FF",
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
    backgroundColor: '#2A3C44',
    zIndex: 1
  }
});

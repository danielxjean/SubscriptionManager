import React, { useEffect, useState } from 'react'
import {
  Pressable,
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
  const [stats, setStats] = useState();
  const [Services, setServices] = useState();
  const backgroundColor='#2A3C44';
  const currentUser = firebase.auth().currentUser;

  useEffect(()=>{
   if (Platform.OS == 'android') {
     StatusBar.setBarStyle('light-content', true)
     StatusBar.setBackgroundColor("#2A3C44")
   }
   _fetchStats()
  },[])

  const _fetchStats = async () =>{
    let data = [
      { name: 'Entertainment', cost: 0, color: '#FFC542', legendFontColor: '#7F7F7F', legendFontSize: 11 },
      { name: 'Music', cost: 0, color: '#FF575F', legendFontColor: '#7F7F7F', legendFontSize: 11 },
      { name: 'Gaming', cost: 0, color: '#3DD598', legendFontColor: '#7F7F7F', legendFontSize: 11 },
      { name: 'Other', cost: 0, color: '#6691FF', legendFontColor: '#7F7F7F', legendFontSize: 11 },
    ]
    var docRef = db.collection("users").doc(currentUser.uid);
    docRef.get().then((doc) => {
      if (doc.exists) {
        //Calcutate sum
        let currSum=0;
        const UserInfo=doc.data().services
        for(var i=0;i<UserInfo.length;i++)
          currSum+=UserInfo[i].packages
        setSum(currSum)
        //Calculate Category patrition
        let Service = doc.data().services
        setServices(Service)
        for (var i = 0;i<Service.length;i++)
        {
          if(Service[i].Category==0)
            data[0].cost+=Service[i].packages
          if(Service[i].Category==1)
            data[1].cost+=Service[i].packages
          if(Service[i].Category==2)
            data[2].cost+=Service[i].packages
          if(Service[i].Category==3)
            data[3].cost+=Service[i].packages
        }
        setStats(data)
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
      navigation.navigate('ManageSubscriptions');

  const statistics = () =>
      navigation.navigate('Statistics');

  const upcomingPayments = () =>
      Alert.alert("Button for upcomingPayments (TODO!");

  const logout = () => {
    Alert.alert('logging out');
    firebase.auth().signOut();
  }
        return(
          <ScrollView contentContainerStyle={{flexGrow: 1}} >
            <View style = {{ backgroundColor: backgroundColor, height: '100%'}}>

                <Card style={styles.monthlyCard}>
                  <Card.Content>
                    <Title style={{textAlign:"center"}}>Monthly Cost</Title>
                    <Headline style={{textAlign:"center"}}>{Sum}$</Headline>
                  </Card.Content>
                </Card>
              <Statistics stats={stats}/>
              <Pressable onPress={_fetchStats}>
                <Text style={styles.refreshText}>Press to refresh</Text>
              </Pressable>
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
  refreshText:{
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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

import React, { useEffect ,useState} from 'react'
import { SafeAreaView, Text, View, StyleSheet, Dimensions, ScrollView ,StatusBar} from 'react-native';
import {Card, Title, Headline} from 'react-native-paper';
import { firebase,db } from '../../database/firebase';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from 'react-native-chart-kit';
import TabBar from '../components/TabBar.jsx';



export default function Statistics({navigation}) {
  const [Services, setServices] = useState();
  const [stats, setStats] = useState();
  const currentUser = firebase.auth().currentUser;
  let data = [
    { name: 'Entertainment', cost: 0, color: '#FFC542', legendFontColor: '#7F7F7F', legendFontSize: 11 },
    { name: 'Music', cost: 0, color: '#FF575F', legendFontColor: '#7F7F7F', legendFontSize: 11 },
    { name: 'Gaming', cost: 0, color: '#3DD598', legendFontColor: '#7F7F7F', legendFontSize: 11 },
    { name: 'Other', cost: 0, color: '#6691FF', legendFontColor: '#7F7F7F', legendFontSize: 11 },
  ]
  useEffect(()=>{
    if (Platform.OS == 'android') {
      StatusBar.setBarStyle('light-content', true)
      StatusBar.setBackgroundColor("#2A3C44")
    }
    _fetchServics();
  }, [])

  const _fetchServics = async () =>{

    var docRef = db.collection("users").doc(currentUser.uid);
    data[0].cost=0
    data[1].cost=0
    data[2].cost=0
    data[3].cost=0
    docRef.get().then((doc) => {
      if (doc.exists) {
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
          setStats(data)
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

    return (
                 <Card style={styles.monthlyCard}>
                     <Card.Content>
                        <Text style={styles.header}>Statistics</Text>
                       {stats &&
                         <PieChart
                             data={stats}
                             width={300}
                             height={175}
                             chartConfig={{
                               backgroundColor: '#e26a00',
                               backgroundGradientFrom: '#fb8c00',
                               backgroundGradientTo: '#ffa726',
                               decimalPlaces: 2, // optional, defaults to 2dp
                               color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                               style: {
                                 borderRadius: 16
                               }
                             }}
                             accessor="cost"
                             backgroundColor="transparent"

                         />
                       }
                     </Card.Content>
                 </Card>
    )
}

const styles = StyleSheet.create({
   monthlyCard: {
       backgroundColor: '#30444E',
       borderRadius: 20,
       overflow: 'hidden',
       marginTop: 50,
       marginBottom: 50,
       marginLeft: 20,
       marginRight: 20
     },
  header: {
    textAlign: 'center',
    fontSize: 24,
    padding: 12,
    marginTop: 12,
    color: 'white',
    fontWeight: 'bold'
  },
  footer: {
      zIndex: 999
     }
});

import React, { useEffect ,useState} from 'react'
import { SafeAreaView, Text, View, StyleSheet, Dimensions, ScrollView ,StatusBar} from 'react-native';
import {Card, Title, Headline} from 'react-native-paper';
import { firebase,db } from '../../database/firebase';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from 'react-native-chart-kit';
import TabBar from '../components/TabBar.jsx';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Statistics({navigation,stats}) {
  const [refreshing, setRefreshing] = React.useState(false);

  const currentUser = firebase.auth().currentUser;
  useEffect(()=>{
    if (Platform.OS == 'android') {
      StatusBar.setBarStyle('light-content', true)
      StatusBar.setBackgroundColor("#2A3C44")
    }
  }, [])


    return (
                 <Card style={styles.monthlyCard}>
                     <Card.Content>
                        <Text style={styles.header}>Cost Patrition per Category</Text>
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

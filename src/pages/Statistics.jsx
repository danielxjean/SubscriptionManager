import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import {Card, Title, Headline} from 'react-native-paper';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from 'react-native-chart-kit';

const data = [
  { name: 'Entertainment', cost: 21, color: '#FFC542', legendFontColor: '#7F7F7F', legendFontSize: 11 },
  { name: 'Music', cost: 18, color: '#FF575F', legendFontColor: '#7F7F7F', legendFontSize: 11 },
  { name: 'Gaming', cost: 12, color: '#3DD598', legendFontColor: '#7F7F7F', legendFontSize: 11 },
  { name: 'Other', cost: 6, color: '#6691FF', legendFontColor: '#7F7F7F', legendFontSize: 11 },
  ]


export default function Statistics() {
    return (

        <View>
            <View style = {{ backgroundColor: '#2A3C44', height: '100%'}}>
                 <Card style={styles.monthlyCard}>
                     <Card.Content>
                        <Text style={styles.header}>Statistics</Text>
                        <PieChart
                          data={data}
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
                     </Card.Content>
                 </Card>
            </View>
        </View>

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
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { StackNavigator } from 'react-navigation';
import AddSubscription from '../pages/AddSubscription';
import { useNavigation } from '@react-navigation/native';



export default function TabBar({ navigation }){
  const goHome = () =>
      navigation.navigate('Home');
    return(
        <View style={{flex: 1}}>
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
                <Card style={styles.bar}>
                    <Card.Content style={{flexDirection: 'row'}}>

                        <IconButton icon='menu' color={"white"} size={40} style={styles.buttons} onPress={goHome} />
                        <IconButton icon='home' color={"white"} size={36} style={styles.homeButton} onPress={goHome} />
                        <IconButton icon='account' color={"white"} size={40} style={styles.buttons} onPress={goHome} />

                    </Card.Content>
                </Card>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
  buttons: {
    width:50,
    height:50,
    overflow: 'hidden',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 45,
    marginRight: 45,
    alignItems:'center',
    justifyContent:'center'
    },

  homeButton: {
    width:50,
    height:50,
    overflow: 'hidden',
    backgroundColor: '#40DF9F',
    borderRadius: 50,
    marginTop: 4,
    marginBottom: 4,

    alignItems:'center',
    justifyContent:'center'
  },

  bar: {
    borderRadius: 20,
    height: 90,
    left: '0%',
    right: '0%',
    top: '0%',
    bottom: '0%',
    backgroundColor: '#30444E'
    }
});

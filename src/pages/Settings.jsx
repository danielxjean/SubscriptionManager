import React from "react";
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';


export default function Settings( {navigation}) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Button onPress={() => navigation.navigate('Menu') }/>

      </View>
    );
  }


import React from "react";
import { View, Text } from "react-native";
import { Button } from 'react-native-elements';




export default function Menu( { navigation } ) {
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Menu!</Text>
        <Button onPress={() => navigation.navigate('Settings') }/>
        <Button onPress={() => navigation.navigate('UpcomingPayments') }/>
        <Button onPress={() => navigation.navigate('ManageSubscriptions') }/>

      </View>
    );
}
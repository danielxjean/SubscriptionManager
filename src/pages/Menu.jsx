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
import {Card, Title, Paragraph, Headline} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';



export default function Menu( { navigation } ) {
    const addSubscription = () =>
        navigation.navigate('AddSubscription');

    const manageSubscription = () =>
        navigation.navigate('ManageSubscriptions');

    const statistics = () =>
        navigation.navigate('Statistics');

    const upcomingPayments = () =>
        Alert.alert("Button for upcomingPayments (TODO!");
    return(
        <ScrollView contentContainerStyle={{height:"70%"}}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',marginTop:25 }}>
            <Card style={styles.buttonCard}>
                <Card.Content>
                    <TouchableOpacity style={styles.button} onPress={addSubscription}>
                        <LinearGradient
                            style={{flex:1}}
                            colors={['#9FC6FF', '#6993FF', '#516AC2']}
                            height={'100%'}>
                            <Title style={styles.buttonText}>Add Subscription</Title>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={manageSubscription}>
                        <LinearGradient
                            style={{flex:1}}
                            colors={['#9FC6FF', '#6993FF', '#516AC2']}
                            height={48}>
                            <Title style={styles.buttonText}>Manage Subscriptions</Title>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={upcomingPayments}>
                        <LinearGradient
                            style={{flex:1}}
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
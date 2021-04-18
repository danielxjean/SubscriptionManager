import React from 'react';
import { ImageBackground, StyleSheet, View } from "react-native";
import { Button, Text } from 'react-native-elements';

const image = { uri: "https://images.unsplash.com/photo-1556155092-8707de31f9c4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80" }; // Might wanna change this image

export default function LandingPage({ navigation }) {
  return (
    <View style={styles.container}>
    <ImageBackground source={image} style={styles.image}>
      <Text h1 style={styles.text}>
        Subscription Manager
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login')}
        title="Login"
        buttonStyle={styles.button}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Register')}
        title="Sign Up"
        buttonStyle={styles.button}
      /> 
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
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
      backgroundColor: "#000000a0",
      borderWidth: 1,
      borderRadius: 15     
    },
    button: {
      backgroundColor: '#000000a0',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 15       
   }
  });
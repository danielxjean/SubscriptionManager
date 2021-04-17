import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { Header, Button, Text } from 'react-native-elements';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { nameValidator } from '../helpers/nameValidator';
import WavyHeader from '../components/WavyHeader';

export default function Register({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onSignUpPressed = () => {

    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    })
  }

  return (
    // <ImageBackground>
    <View style={{backgroundColor: '#40DF9F', height: '100%'}}>
      <WavyHeader customStyles={styles.svgCurve} />
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Subscription Manager</Text>
          </View>
      <View style={{ paddingTop: 200 }}>

      <TextInput
        label="Username"   
        placeholder="Username"   
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        style={styles.input}
        placeholderTextColor="white"
      />
      <TextInput
        label="Email"
        placeholder="Email"   
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        style={styles.input}
        placeholderTextColor="white"
      />
      <TextInput
        label="Password"
        placeholder="Password"   
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        style={styles.input}
        placeholderTextColor="white"
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        title="Sign Up"
        buttonStyle={styles.button}
      />     
      <View style={styles.signin}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={{color: 'blue'}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  signin: {
    fontSize: 13,
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
    paddingRight: 20
  },
  button: {
    height: 48,
    overflow: 'hidden',
    backgroundColor: '#1A282F',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16     
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
svgCurve: {
  position: 'absolute',
  width: '100%',
  height: '20%'
},
headerText: {
  fontSize: 25,
  fontWeight: 'bold',
  color: '#fff',
  textAlign: 'center',
  marginTop: 40
}
})
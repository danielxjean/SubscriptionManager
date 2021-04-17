import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { Header, Button, Text, colors } from 'react-native-elements';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import WavyHeader from '../components/WavyHeader';

export default function Login({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = () => {

    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
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
      <View style={{backgroundColor: '#40DF9F', height: '100%'}}>
          <WavyHeader customStyles={styles.svgCurve} />
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Subscription Manager</Text>
          </View>
          <View style={{ paddingTop: 200 }}>
            <TextInput
              placeholder="Email"
              label="Email"
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
              placeholder="Password"
              label="Password"
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
              onPress={onLoginPressed}         
              title="Log in"
              buttonStyle={styles.button}
              titleStyle={styles.text}
            />

            <View style={styles.signup}>
              <Text>Don’t have an account? </Text>
              <TouchableOpacity onPress={() => navigation.replace('Register')}>
                <Text style={{color: 'blue'}}>Sign up</Text>
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
  signup: {
    fontSize: 13,
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
    paddingRight: 20,
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
    marginTop: 40,
  }
})
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { Header, Button, Text, colors } from 'react-native-elements';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';

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
      <View>
      <Header centerComponent={{ text: 'Login', style: { color: '#fff' } }} />
      <View>
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
      />
      <Button 
        mode="contained" 
        onPress={onLoginPressed}         
        title="Log in"
        style={styles.content}
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
  },
  content: {
   justifyContent: 'center', 
    alignItems: 'center'
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    borderRadius: 10
  },
})
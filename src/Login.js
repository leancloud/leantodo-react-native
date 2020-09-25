import React, {useContext, useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {ThemeContext, Input, Text, Button} from 'react-native-elements';

export default function Login(props) {
  const {theme} = useContext(ThemeContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    props && props.onLogin && props.onLogin({username, password});
  }

  function handleSignUp() {
    props && props.onSignUp && props.onSignUp({username, password});
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[{color: theme.colors.primary}, styles.logo]}>LeanTodo</Text>
      <Input
        leftIcon={{name: 'person', color: styles.inputIcon.color}}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        inputContainerStyle={styles.inputBox}
      />
      <Input
        leftIcon={{name: 'lock', color: styles.inputIcon.color}}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        errorMessage={props && props.errorMessage}
        onChangeText={setPassword}
        inputContainerStyle={styles.inputBox}
      />
      <View style={styles.buttonGroup}>
        <Button
          title="Login"
          containerStyle={styles.button}
          onPress={handleLogin}
        />
        <Button
          title="Sign up"
          containerStyle={styles.button}
          type="outline"
          onPress={handleSignUp}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 36,
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 4,
    marginTop: 18,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  inputBox: {
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 8,
  },
  inputIcon: {
    color: '#888',
  },
});

var React = require('react-native');
var {Platform, StyleSheet, View, TextInput, TouchableOpacity, Text, ToastAndroid, AlertIOS} = React;
var TodoActions = require('../actions/TodoActions');

var AV = require('avoscloud-sdk');

var Login = React.createClass({
  login: function() {
    var user = new AV.User();
    user.set("username", this.state.username);
    user.set("password", this.state.password);
    user.logIn().then((user) => {
      console.log('User logged in:', user);
      TodoActions.fetchAll();
      this.props.navigator.pop();
    }).catch(function(error) {
      console.log("Login Error: ", error);
      if (Platform.OS === 'android') {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(
          error.message,
          null,
          [
            {text: 'OK'},
          ]
        );
      }
    });
  },
  signup: function() {
    var user = new AV.User();
    user.set("username", this.state.username);
    user.set("password", this.state.password);
    user.signUp().then((user) => {
      console.log('User signed up:', user);
      TodoActions.fetchAll();
      this.props.navigator.pop();
    }).catch(function(error) {
      console.log("Signup Error: ", error);
      if (Platform.OS === 'android') {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      } else {
        AlertIOS.alert(
          error.message,
          null,
          [
            {text: 'OK'},
          ]
        );
      }
    });
  },
  getInitialState: function() {
    return {
      username: 'guest',
      password: 'guest'
    };
  },
  componentDidMount: function() {
    AV.User.logOut().then(()=>console.log('user logged out.'));
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={{flex:1}}></View>
        <Text style={styles.logo}>
          LeanTodo
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
          placeholder="Username"
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          placeholder="Password"
        />
        <View style={styles.btnsWrapper}>
          <TouchableOpacity style={[ButtonStyles.btn, styles.button, styles.loginButton]} onPress={this.login}>
            <Text style={[ButtonStyles.btnText, styles.buttonText, styles.loginButtonText]}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[ButtonStyles.btn, styles.button, styles.registerButton]} onPress={this.signup}>
            <Text style={[ButtonStyles.btnText, styles.buttonText]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:3}}></View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4,
  },

  logo: {
    fontSize: 32,
    color: 'orange',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 60
  },

  textInput: {
    fontSize: 20,
    margin: 4,
    height: 36,
    borderBottomWidth: 0.5,
    borderBottomColor: '#666',
  },

  btnsWrapper: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginTop: 16,
  },
  button: {
    flex: 1,
    margin: 4,
    borderRadius: 4,
  },
  loginButton: {
    backgroundColor: 'orange',
  },
  registerButton: {
    borderWidth: 0.5,
    borderColor: 'orange'
  },
  buttonText: {
    flex: 1,
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
  },
  loginButtonText: {
    color: 'white'
  }
});
var ButtonStyles = require('./ButtonStyles');

module.exports = Login;

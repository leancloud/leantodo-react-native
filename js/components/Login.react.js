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
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <TextInput
          secureTextEntry
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <TouchableOpacity onPress={this.login}>
          <Text style={styles.loginButton}>
            登录
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.signup}>
          <Text style={styles.loginButton}>
            注册
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  loginButton: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

module.exports = Login;

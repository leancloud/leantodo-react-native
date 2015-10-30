/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  TextInput,
  TouchableHighlight,
  Navigator
} = React;

var AV = require('avoscloud-sdk');
AV.initialize('ozewwcwsyq92g2hommuxqrqzg6847wgl8dtrac6suxzko333', 'ni0kwg7h8hwtz6a7dw9ipr7ayk989zo5y8t0sn5gjiel6uav');
AV.Promise.setPromisesAPlusCompliant(true);

var TodoList = require('./js/components/TodoList.react');
var Login = require('./js/components/Login.react');

function logIn(navigator) {
  navigator.push({
    name: 'login'
  });
}

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  if (route.name === 'login') {
    return (
      <Login navigator={navigationOperations}/>
    );
  } else if (route.name === 'list') {
    return (
      <View style={styles.container}>
        <View>
          <Text>LeanTodo</Text>
          <TouchableHighlight onPress={()=>logIn(navigationOperations)}>
            <Text style={styles.loginButton}>
              注销
            </Text>
          </TouchableHighlight>
        </View>
        <TodoList
          navigator={navigationOperations}
          logIn={()=>logIn(navigationOperations)}
          movie={route.movie}
        />
    </View>
    );
  }
};

var TodoApp = React.createClass({
  render: function() {
    var initialRoute = {name: 'list'};
    return (
      <Navigator
        style={styles.container}
        initialRoute={initialRoute}
        configureScene={() => Navigator.SceneConfigs.FloatFromBottom}
        renderScene={RouteMapper.bind(this)}
      />
    );
  }
});
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#a9a9a9',
    height: 56,
  },
});

AppRegistry.registerComponent('LeanTodo', () => TodoApp);

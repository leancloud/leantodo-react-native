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

var TodoList = require('./components/TodoList.react');
var Login = require('./components/Login.react');

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
    let list = (
      <TodoList
        navigator={navigationOperations}
        logIn={()=>logIn(navigationOperations)}
        movie={route.movie}
      />
    );
    return require('./components/Todo.react')(
      route,
      navigationOperations,
      onComponentRef,
      logIn,
      list
    );
  }
};

var TodoApp = React.createClass({
  render: function() {
    var initialRoute = {name: 'list'};
    // https://github.com/facebook/react-native/issues/2178
    return (
      <Navigator
        style={styles.container}
        initialRoute={initialRoute}
        configureScene={scene => ({
            ...Navigator.SceneConfigs.FloatFromBottom,
            gestures: {
              pop: {
                ...Navigator.SceneConfigs.FloatFromBottom.gestures.pop,
                edgeHitWidth: 0,
              },
            },
          })}
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

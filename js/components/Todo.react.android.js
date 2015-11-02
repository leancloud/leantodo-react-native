var React = require('react-native');
var {
  StyleSheet,
  ToolbarAndroid,
  View,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  toolbar: {
    backgroundColor: 'orange',
    height: 56,
  },
});

var ButtonStyles = require('./ButtonStyles');

export default (
  route,
  navigationOperations,
  onComponentRef,
  logIn,
  list
)=>(
  <View style={styles.container}>
    <ToolbarAndroid
      style={styles.toolbar}
      titleColor="white"
      title="LeanTodo"
      actions={[{title: 'Logout', show: 'always', icon: require('image!ic_logout')}]}
      onActionSelected={()=>logIn(navigationOperations)}
    />
    {list}
  </View>
);

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topBar: {
    backgroundColor: '#f9f9f9',
    height: 60,
    paddingTop: 20,
    borderBottomColor: '#999',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  logOutBtn: {
    position: 'absolute',
    height: 39,
    right: 0,
  }
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
    <View style={styles.topBar}>
      <Text style={styles.title}>LeanTodo</Text>
      <TouchableOpacity
        style={[ButtonStyles.btn, styles.logOutBtn]}
        onPress={()=>logIn(navigationOperations)}>
        <Text style={ButtonStyles.btnText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
    {list}
  </View>
);

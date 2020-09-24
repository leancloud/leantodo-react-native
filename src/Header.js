import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {ThemeContext, Header as RNHeader, Input} from 'react-native-elements';
import {useActionSheet} from '@expo/react-native-action-sheet';

export default function Header(props) {
  const {theme} = useContext(ThemeContext);
  const {showActionSheetWithOptions} = useActionSheet();

  function handleClearDone() {
    props?.onClearDone?.();
  }

  function handleLogout() {
    props?.onLogout?.();
  }

  function showActionSheet() {
    showActionSheetWithOptions(
      {
        options: ['Clear done', 'Log out', 'Cancel'],
        cancelButtonIndex: 2,
        destructiveButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex < 2) {
          [handleClearDone, handleLogout][buttonIndex]();
        }
      },
    );
  }

  return (
    <View>
      <RNHeader
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          size: 26,
          onPress: showActionSheet,
        }}
        centerComponent={{
          text: 'LeanTodo',
          style: {
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
          },
        }}
        rightComponent={{
          icon: 'add',
          color: '#fff',
          size: 26,
          onPress: props?.onAddTodo,
        }}
        containerStyle={styles.headerContainer}
      />
      <Input
        inputContainerStyle={styles.inputContainer}
        containerStyle={{
          ...styles.inputBox,
          backgroundColor: theme.colors.primary,
        }}
        clearButtonMode="while-editing"
        value={props?.todoContent}
        onChangeText={props?.onChangeContent}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 0,
  },
  inputBox: {
    paddingBottom: 8,
    height: 40,
  },
  inputContainer: {
    borderWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 8,
    height: '100%',
    backgroundColor: '#fff',
    paddingLeft: 6,
  },
  input: {
    fontSize: 16,
  },
});

import React, {useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ListItem, Icon, Input, ThemeContext} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';

export default function TodoList(props) {
  const {theme} = useContext(ThemeContext);

  function renderHiddenItem(data) {
    const todo = data.item;
    return (
      <View style={styles.todoBack}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => props?.onDelete?.(todo.id)}>
          <Text style={styles.whiteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderTodoItem(data) {
    const todo = data.item;
    return (
      <ListItem bottomDivider>
        {todo.done ? (
          <Icon
            name="check-circle"
            color="#93ec94"
            onPress={() => props?.onToggleDone?.(todo.id)}
          />
        ) : (
          <Icon
            name="radio-button-unchecked"
            color={theme.colors.primary}
            onPress={() => props?.onToggleDone?.(todo.id)}
          />
        )}
        <ListItem.Content>
          {props?.editingId === todo.id ? (
            <Input
              clearButtonMode="while-editing"
              containerStyle={styles.todoInputBox}
              inputContainerStyle={styles.todoInputContainer}
              style={styles.todoInput}
              value={props?.editingContent}
              autoFocus={true}
              onChangeText={props?.onChangeEditingContent}
              onBlur={props?.onEditingInputBlur}
            />
          ) : (
            <ListItem.Title
              onPress={() => props?.onContentClick?.(todo.id)}
              style={todo.done ? styles.todoContentDone : {}}>
              {todo.content}
            </ListItem.Title>
          )}
        </ListItem.Content>
      </ListItem>
    );
  }

  return (
    <SwipeListView
      data={props.todos}
      rightOpenValue={-60}
      stopRightSwipe={-60}
      disableRightSwipe={true}
      renderItem={renderTodoItem}
      renderHiddenItem={renderHiddenItem}
      style={styles.todoList}
      keyExtractor={(todo) => todo.id}
    />
  );
}

const styles = StyleSheet.create({
  todoList: {},
  deleteButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 60,
    height: '100%',
    position: 'absolute',
  },
  whiteText: {
    color: '#fff',
  },
  todoBack: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  todoInputBox: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 10,
    height: 32,
    position: 'absolute',
    paddingHorizontal: 0,
    left: -4,
  },
  todoInputContainer: {
    borderBottomWidth: 0,
    height: '100%',
    paddingLeft: 8,
  },
  todoInput: {
    fontSize: 17,
  },
  todoContentDone: {
    textDecorationLine: 'line-through',
    opacity: 0.4,
  },
});

import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ListItem, Icon, Input, ThemeContext} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';

function CheckIcon(props) {
  const {theme} = useContext(ThemeContext);
  const name = props.checked ? 'check-circle' : 'radio-button-unchecked';
  const color = props.checked ? '#93ec94' : theme.colors.primary;
  return <Icon name={name} color={color} onPress={props.onPress} />;
}

function TodoItem(props) {
  const [editing, setEditing] = useState(false);
  const [editingContent, setEditingContent] = useState('');

  function handleChangeContent() {
    setEditingContent(props.content);
    setEditing(true);
  }

  function handleFinishChangeContent() {
    if (editingContent !== props.content) {
      props.onChangeContent(editingContent);
    }
    setEditing(false);
  }

  return (
    <ListItem bottomDivider>
      <CheckIcon checked={props.done} onPress={props.onChangeDone} />
      <ListItem.Content>
        {editing ? (
          <Input
            clearButtonMode="while-editing"
            containerStyle={styles.todoInputBox}
            inputContainerStyle={styles.todoInputContainer}
            style={styles.todoInput}
            value={editingContent}
            autoFocus={true}
            onChangeText={setEditingContent}
            onBlur={handleFinishChangeContent}
          />
        ) : (
          <ListItem.Title
            onPress={handleChangeContent}
            style={props.done ? styles.todoContentDone : null}>
            {props.content}
          </ListItem.Title>
        )}
      </ListItem.Content>
    </ListItem>
  );
}

export default function TodoList(props) {
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
      <TodoItem
        content={todo.content}
        done={todo.done}
        onChangeDone={() => props.onChangeDone(todo.id, !todo.done)}
        onChangeContent={(content) => props.onChangeContent(todo.id, content)}
      />
    );
  }

  if (props.todos.length === 0) {
    return (
      <View style={styles.emptyListBox}>
        <Text style={styles.emptyListText}>Nothing</Text>
      </View>
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
      keyExtractor={(todo) => todo.id}
    />
  );
}

const styles = StyleSheet.create({
  emptyListBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    color: 'gray',
  },
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

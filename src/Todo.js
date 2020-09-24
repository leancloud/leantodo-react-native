import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import Header from './Header';
import TodoList from './TodoList';

export default function Todo(props) {
  const [todos, setTodos] = useState([]);
  const [contentForAdd, setContentForAdd] = useState('');
  const [editingId, setEditingId] = useState();
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    //
  }, []);

  function handleAddTodo() {
    if (!contentForAdd) {
      return;
    }
    todos.unshift({id: contentForAdd, content: contentForAdd, done: false});
    setContentForAdd('');
    setTodos([...todos]);
  }

  function handleClearDone() {
    todos.forEach((todo) => {
      if (todo.done) {
        // delete
      }
    });
    setTodos(todos.filter((todo) => !todo.done));
  }

  function findTodoById(id) {
    return todos.find((todo) => todo.id === id);
  }

  function handleChangeContent(id) {
    const todo = findTodoById(id);
    setEditingId(id);
    setEditingContent(todo.content);
  }

  function handleFinishChangeContent() {
    const todo = findTodoById(editingId);
    if (editingContent !== todo.content) {
      todo.content = editingContent;
      setTodos([...todos]);
    }
    setEditingId(null);
  }

  function handleToggleDone(id) {
    const todo = findTodoById(id);
    todo.done = !todo.done;
    setTodos([...todos]);
  }

  function handleDelete(id) {
    for (let i = 0; i < todos.length; ++i) {
      if (todos[i].id === id) {
        todos.splice(i, 1);
        break;
      }
    }
    setTodos([...todos]);
  }

  return (
    <View style={styles.container}>
      <Header
        todoContent={contentForAdd}
        onChangeContent={setContentForAdd}
        onAddTodo={handleAddTodo}
        onClearDone={handleClearDone}
        onLogout={props?.onLogout}
      />
      {todos.length ? (
        <TodoList
          todos={todos}
          editingId={editingId}
          editingContent={editingContent}
          onChangeEditingContent={setEditingContent}
          onContentClick={handleChangeContent}
          onEditingInputBlur={handleFinishChangeContent}
          onToggleDone={handleToggleDone}
          onDelete={handleDelete}
        />
      ) : (
        <View style={styles.emptyListBox}>
          <Text style={styles.emptyListText}>Nothing</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyListBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    color: 'gray',
  },
});

import React from 'react';
import {View, StyleSheet} from 'react-native';

import Header from './Header';
import TodoList from './TodoList';

import {CLASS, User, ACL} from 'leancloud-storage';

function convertTodo(todo) {
  return {
    id: todo.objectId,
    content: todo.data.content,
    done: todo.data.done,
  };
}

export default class Todo2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {todos: []};
    this.liveQuery = null;
  }

  componentDidMount() {
    User.currentAsync().then((currentUser) => {
      const query = CLASS('Todo')
        .where('user', '==', currentUser)
        .orderBy('createdAt', 'desc');

      query.find().then((todoObjects) => {
        this.setState({todos: todoObjects.map(convertTodo)});
      });

      const upsert = (obj) => this.upsert(convertTodo(obj));
      const remove = (obj) => this.remove(obj.id);
      query.subscribe().then((liveQuery) => {
        liveQuery.on('create', upsert);
        liveQuery.on('enter', upsert);
        liveQuery.on('update', upsert);
        liveQuery.on('leave', remove);
        liveQuery.on('delete', remove);
        this.liveQuery = liveQuery;
      });
    });
  }

  componentWillUnmount() {
    if (this.liveQuery) {
      this.liveQuery.unsubscribe();
    }
  }

  upsert = ({id, content, done}) => {
    const todo = this.state.todos.find((t) => t.id === id);
    if (todo) {
      if (content !== undefined) {
        todo.content = content;
      }
      if (done !== undefined) {
        todo.done = done;
      }
    } else {
      this.state.todos.unshift({id, content, done});
    }
    this.setState({todos: [...this.state.todos]});
  };

  remove = (id) => {
    for (let i = 0; i < this.state.todos.length; i++) {
      if (this.state.todos[i].id === id) {
        this.state.todos.splice(i, 1);
        this.setState({todos: [...this.state.todos]});
        break;
      }
    }
  };

  handleAddTodo = async (content) => {
    const currentUser = await User.currentAsync();

    const acl = new ACL();
    acl.allow(User.current(), 'read').allow(User.current(), 'write');
    const todo = await CLASS('Todo').add({
      ACL: acl,
      content,
      done: false,
      user: currentUser,
    });

    this.upsert({
      id: todo.objectId,
      content,
      done: false,
    });
  };

  handleChangeContent = async (id, content) => {
    await CLASS('Todo').object(id).update({content});
    this.upsert({id, content});
  };

  handleChangeDone = async (id, done) => {
    await CLASS('Todo').object(id).update({done});
    this.upsert({id, done});
  };

  handleDelete = async (id) => {
    await CLASS('Todo').object(id).delete();
    this.remove(id);
  };

  handleClearDone = async () => {
    await Promise.all(
      this.state.todos
        .filter((todo) => todo.done)
        .map((todo) => CLASS('Todo').object(todo.id).delete()),
    );
    this.setState({todos: this.state.todos.filter((todo) => !todo.done)});
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          onAddTodo={this.handleAddTodo}
          onClearDone={this.handleClearDone}
          onLogout={this.props.onLogout}
        />
        <TodoList
          todos={this.state.todos}
          onChangeContent={this.handleChangeContent}
          onChangeDone={this.handleChangeDone}
          onDelete={this.handleDelete}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/**
 * Copyright (c) 2015, LeanCloud.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * This component operates as a "Controller-View".  It listens for changes in
 * the TodoStore and passes the new data to its children.
 */

var Footer = require('./Footer.react');
var Header = require('./Header.react');
var MainSection = require('./MainSection.react');
var React = require('react-native');
var {View} = React;
var TodoStore = require('../stores/TodoStore');
var TodoActions = require('../actions/TodoActions');
var AV = require('avoscloud-sdk');

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  };
}

var TodoList = React.createClass({

  getInitialState: function() {
    return getTodoState();
  },

  componentDidMount: function() {
    console.log(2222);
    AV.User.currentAsync().then((currentUser) => {
      console.log('currentUser: ',currentUser);
      if (!currentUser) {
        this.props.logIn();
      }
      else {
        TodoActions.fetchAll();
        TodoStore.addChangeListener(this._onChange);
      }
    }, (e)=>console.log(e));
    console.log(33333, AV.User.currentAsync());
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <View style={{flex: 1}}>
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
          style={{flex: 1}}
        />
        <Footer allTodos={this.state.allTodos} />
      </View>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onChange: function() {
    this.setState(getTodoState());
  }

});

module.exports = TodoList;

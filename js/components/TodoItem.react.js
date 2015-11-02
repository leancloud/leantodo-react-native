/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react-native');
var {View, Text, TextInput, TouchableOpacity, StyleSheet} = React;
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

var classNames = require('classnames');

var TodoItem = React.createClass({

  propTypes: {
   todo: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var todo = this.props.todo;

    var input;
    if (this.state.isEditing) {
      input =
        <TodoTextInput
          onSave={this._onSave}
          value={todo.get('content')}
          style={styles.content}
          textStyles={styles.contentText}
        />;
    }
    else {
      input =
          <Text
            onPress={this._onPress}
            style={[styles.content, styles.contentText]}>
            {todo.get('content')}
          </Text>;
    }

    let checkboxStyle = todo.get('done') ? styles.checkboxDone : null;

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={this._onToggleComplete}>
            <View style={[styles.checkbox, checkboxStyle]} />
          </TouchableOpacity>
          {input}
        </View>
    );
  },

  _onToggleComplete: function() {
    TodoActions.toggleComplete(this.props.todo, this.props.id);
  },

  _onPress: function() {
    this.setState({isEditing: true});
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(text) {
    TodoActions.updateText(this.props.id, text);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    TodoActions.destroy(this.props.id);
  }

});

const styles = StyleSheet.create({
  container: {
    paddingLeft: 18,
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    width: 18,
    height: 18,
    marginRight: 20,
    borderRadius: 18 / 2,
    borderWidth: 1,
    borderColor: 'orange'
  },
  checkboxDone: {
    borderColor: '#91ee91',
    backgroundColor: '#91ee91'
  },
  content: {
    paddingVertical: 12,
    flex: 1,
    justifyContent: 'center'
  },
  contentText: {
    height: 48,
    fontSize: 20,
  }
});

module.exports = TodoItem;

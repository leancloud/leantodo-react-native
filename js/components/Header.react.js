/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react-native');
var {View, Text, TextInput} = React;
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <View style={styles.wrapper}>
        <TodoTextInput
          placeholder="What needs to be done?"
          onSave={this._onSave}
          multiline
          clearOnSave
          textStyles={styles.input}
        />
    </View>
    );
  },

  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
    if (text.trim()){
      TodoActions.create(text);
    }
  }

});

var styles = {
  wrapper: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  input: {
    fontSize: 20,
    margin: 10,
    height: 36
  }
};

module.exports = Header;

/**
 * Copyright (c) 2015, LeanCloud.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react-native');
var {View, Text, TouchableOpacity, StyleSheet} = React;
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');

var Footer = React.createClass({

  propTypes: {
    allTodos: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var allTodos = this.props.allTodos;
    var total = Object.keys(allTodos).length;

    if (total === 0) {
      return null;
    }

    var completed = 0;
    for (var key in allTodos) {
      if (allTodos[key].get('done')) {
        completed++;
      }
    }

    var itemsLeft = total - completed;

    // Undefined and thus not rendered if no completed items are left.
    var clearCompletedButton;
    if (completed) {
      clearCompletedButton =
        <Text style={ButtonStyles.btnText}>
          Clear done ({completed})
        </Text>;
    }

  	return (
      <View style={styles.footer}>
        <Text style={styles.count}>
          {(total - completed) + ' / ' + total}
        </Text>
        <TouchableOpacity style={[ButtonStyles.btn, styles.clearBtn]} onPress={this._onClearCompletedClick}>
          {clearCompletedButton}
        </TouchableOpacity>
      </View>
    );
  },

  /**
   * Event handler to delete all completed TODOs
   */
  _onClearCompletedClick: function() {
    TodoActions.destroyCompleted();
  }

});

var styles = StyleSheet.create({
  footer: {
    backgroundColor: '#f9f9f9',
    height: 40,
    borderTopColor: '#999',
    borderTopWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  count: {
    flex: 1,
    marginLeft: 12
  },
  clearBtn: {
    paddingHorizontal: 12,
    height: 40
  }
});
var ButtonStyles = require('./ButtonStyles');

module.exports = Footer;

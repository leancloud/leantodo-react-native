/**
 * Copyright (c) 2015, LeanCloud.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react-native');
var {View, Text, TextInput, ListView} = React;
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');
var TodoItem = require('./TodoItem.react');

var MainSection = React.createClass({

  propTypes: {
    allTodos: ReactPropTypes.object.isRequired,
    areAllComplete: ReactPropTypes.bool.isRequired
  },

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(
        this._createDataSource(this.props.allTodos))
      // dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
        this._createDataSource(nextProps.allTodos))
    });
  },

  _createDataSource: function(todos) {
    var todosArray = [];

    for (var key in todos) {
      todosArray.push({
        key,
        value: todos[key]
      });
    }
    return todosArray.sort(
      (a, b) => a.key > b.key ? -1 : 1
    );
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are todos.
    // if (Object.keys(this.props.allTodos).length < 1) {
    //   return null;
    // }

    return (
        <ListView
          style={{flex: 1}}
          keyboardDismissMode="on-drag"
          automaticallyAdjustContentInsets={false}
          keyboardShouldPersistTaps={true}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <TodoItem id={rowData.key} todo={rowData.value} />
            /* <Text>{rowData.key}</Text> */
            /* <Text>{rowData}</Text> */
          }
        />
    );
  },

  /**
   * Event handler to mark all TODOs as complete
   */
  _onToggleCompleteAll: function() {
    TodoActions.toggleCompleteAll();
  }

});

module.exports = MainSection;

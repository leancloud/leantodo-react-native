/**
 * Copyright (c) 2015, LeanCloud.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react-native');
var {TextInput} = React;
var ReactPropTypes = React.PropTypes;

var TodoTextInput = React.createClass({

  propTypes: {
    onSave: ReactPropTypes.func.isRequired,
    value: ReactPropTypes.string
  },

  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },

  /**
   * @return {object}
   */
  render: function() /*object*/ {
    return (
      this.props.multiline ?
      <TextInput
        onChangeText={this._onChange}
        autoFocus
        multiline
        value={this.state.value}
        placeholder={this.props.placeholder}
        style={[this.props.textStyles, inputStyles]}
      /> :
      <TextInput
        onChangeText={this._onChange}
        autoFocus
        onSubmitEditing={this._save}
        onBlur={this._save}
        value={this.state.value}
        placeholder={this.props.placeholder}
        style={[this.props.textStyles, inputStyles]}
      />
    );
  },

  /**
   * Invokes the callback passed in as onSave, allowing this component to be
   * used in different ways.
   */
  _save: function() {
    console.log('saving ' + this.state.value);
    this.props.onSave(this.state.value);
    if (this.props.clearOnSave) {
      this.setState({
        value: ''
      });
    }
  },

  _onChange: function(text) {
    this.setState({value: text});
    if (text[text.length-1] === '\n') {
      this._save();
    }
  }

});

const inputStyles = {
  paddingVertical: 0,
  paddingHorizontal: 0,
  backgroundColor: '#fff',
  flex: 1,
};

module.exports = TodoTextInput;

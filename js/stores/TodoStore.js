/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('eventemitter2').EventEmitter2;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var AV = require('avoscloud-sdk');
var Todo = AV.Object.extend('Todo');

var CHANGE_EVENT = 'change';

var _todos = {};

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function add(todo) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  // var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  var id = todo.createdAt ? todo.createdAt.getTime() : Date.now();
  _todos[id] = todo;
  if (todo.dirty()) {
    return todo.save().then(()=>{
      delete _todos[id];
      _todos[todo.createdAt.getTime().toString()] = todo;
    });
  } else {
    return AV.Promise.as();
  }
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  var todo = _todos[id];
  todo.set(updates);
  if (todo.dirty()) {
    return todo.save();
  } else {
    return AV.Promise.as();
  }
}

/**
 * Update all of the TODO items with the same object.
 * @param  {object} updates An object literal containing only the data to be
 *     updated.
 */
function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
  _todos[id].destroy();
  delete _todos[id];
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].get('done')) {
      destroy(id);
    }
  }
}

function destroyAll() {
  _todos = {};
}

var TodoStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function() {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }
    return true;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _todos;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case TodoConstants.TODO_CREATE:
      text = action.text.trim();
      if (text !== '') {
        AV.User.currentAsync().then((currentUser) => {
          var todo = new Todo();
          todo.set('content', text);
          todo.set('done', false);
          todo.set('user', currentUser);
          add(todo).then(()=>TodoStore.emitChange());
          TodoStore.emitChange();
        });
      }
      break;

    case TodoConstants.TODO_FETCH_ALL:
      AV.User.currentAsync().then((currentUser) => {
        // console.log('currentUser: ',currentUser);
        destroyAll();
        var query = new AV.Query(Todo);
        query.equalTo("user", currentUser);
        query.find().then(
          (todos)=> {
            console.log(todos);
            Promise.all(todos.map(add))
              .then(()=>TodoStore.emitChange());
          }
        ).catch((err)=>console.log(err));
      });
      break;

    case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
      if (TodoStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UNDO_COMPLETE:
      update(action.id, {done: false});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_COMPLETE:
      update(action.id, {done: true});
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {content: text});
        TodoStore.emitChange();
      }
      break;

    case TodoConstants.TODO_DESTROY:
      destroy(action.id);
      TodoStore.emitChange();
      break;

    case TodoConstants.TODO_DESTROY_COMPLETED:
      destroyCompleted();
      TodoStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = TodoStore;

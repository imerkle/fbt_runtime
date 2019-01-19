"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * 
 * @format
 *
 * Wrapper module for fbt.js (the implementation)
 */
var FbtPureStringResult = require('FbtPureStringResult');

var fbt = require('fbt');

var invariant = require('invariant');

var FbsImpl = _objectSpread({}, fbt, {
  /**
   * @see fbt._param()
   */
  _param: function _param(label, value, variations) {
    // TODO(T36305131) Returning implicit Flow type until fbt.js is typed properly
    invariant(typeof value === 'string' || value instanceof FbtPureStringResult, 'Expected fbs parameter value to be the result of fbs(), <fbs/>, or a string; ' + 'instead we got `%s` (type: %s)', value, _typeof(value)); // $FlowFixMe TODO(T36305131) Add accurate flow types to fbt.js

    return fbt._param.apply(fbt, arguments);
  },
  _wrapContent: function _wrapContent(fbtContent, patternString, patternHash) {
    var contents = typeof fbtContent === 'string' ? [fbtContent] : fbtContent;
    return new FbtPureStringResult(contents);
  }
});

module.exports = FbsImpl;
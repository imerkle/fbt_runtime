"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 * @format
 * 
 */
// No-op class implementation for Open Source
var FBLogMessage =
/*#__PURE__*/
function () {
  function FBLogMessage(_) {
    _classCallCheck(this, FBLogMessage);
  }

  _createClass(FBLogMessage, [{
    key: "mustfix",
    value: function mustfix() {}
  }, {
    key: "warn",
    value: function warn() {}
  }, {
    key: "info",
    value: function info() {}
  }, {
    key: "debug",
    value: function debug() {}
  }, {
    key: "catching",
    value: function catching() {}
  }, {
    key: "blameToPreviousFile",
    value: function blameToPreviousFile() {}
  }, {
    key: "blameToPreviousFrame",
    value: function blameToPreviousFrame() {}
  }, {
    key: "blameToPreviousDirectory",
    value: function blameToPreviousDirectory() {}
  }, {
    key: "addMetadata",
    value: function addMetadata() {}
  }]);

  return FBLogMessage;
}();

module.exports = FBLogMessage;
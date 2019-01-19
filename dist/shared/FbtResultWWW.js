/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * 
 * @format
 * @emails oncall+internationalization
 */
'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FBLogger = require('FBLogger');

var FbtResultBase = require('FbtResultBase');

var killswitch = require('killswitch');

function logErrorUseStringMethod(methodName) {
  // If the contents is array of length greater than one, then use the string
  // method will cause error
  FBLogger('fbt').blameToPreviousFile().mustfix('Error using fbt string. Used method %s' + ' on Fbt string. Fbt string is designed to be immutable ' + 'and should not be manipulated.', methodName);
}
/**
 * The FbtResultBase "implemented" module for www.
 */


var FbtResultWWW =
/*#__PURE__*/
function (_FbtResultBase) {
  _inherits(FbtResultWWW, _FbtResultBase);

  function FbtResultWWW() {
    _classCallCheck(this, FbtResultWWW);

    return _possibleConstructorReturn(this, _getPrototypeOf(FbtResultWWW).apply(this, arguments));
  }

  _createClass(FbtResultWWW, [{
    key: "onStringSerializationError",
    value: function onStringSerializationError(content) {
      var details = 'Context not logged.';

      if (!killswitch('JS_RELIABILITY_FBT_LOGGING')) {
        try {
          details = JSON.stringify(content).substr(0, 250);
        } catch (err) {
          // Catching circular reference error
          details = err.message;
        }
      }

      FBLogger('fbt').blameToPreviousFile().mustfix('Converting to a string will drop content data. %s', details);
    }
  }]);

  return FbtResultWWW;
}(FbtResultBase);

var FbtResultWWWWithStringishMethods = FbtResultWWW.usingStringProxyMethod(function (methodName) {
  return function () {
    logErrorUseStringMethod(methodName); // $FlowFixMe Mock stringish methods

    return String.prototype[methodName].apply(this, arguments);
  };
});
module.exports = FbtResultWWWWithStringishMethods;
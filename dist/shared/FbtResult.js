"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright 2015-present Facebook. All Rights Reserved.
 *
 * This file is shared between www and fbsource and www is the source of truth.
 * When you make change to this file on www, please make sure you test it on
 * fbsource and send a diff to update the files too so that the 2 versions are
 * kept in sync.
 *
 * Run the following command to sync the change from www to fbsource.
 *   js1 upgrade www-shared -p fbt --remote localhost:~/www
 *
 * @format
 * 
 * @emails oncall+internationalization
 */
var FbtReactUtil = require('FbtReactUtil');

var FbtResultBaseImpl = require('FbtResultBaseImpl');

var FbtComponent = function FbtComponent(props) {
  return props.content;
};

var FbtResult =
/*#__PURE__*/
function (_FbtResultBaseImpl) {
  _inherits(FbtResult, _FbtResultBaseImpl);

  function FbtResult(contents) {
    var _this;

    _classCallCheck(this, FbtResult);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FbtResult).call(this, contents));
    /* eslint-disable fb-www/react-state-props-mutation */

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "$$typeof", FbtReactUtil.REACT_ELEMENT_TYPE);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "key", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "props", void 0);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "ref", null);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "type", FbtComponent);

    _this.props = {
      content: contents
    };

    if (__DEV__) {
      FbtReactUtil.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), '_store', {
        validated: true
      });
    }

    return _this;
  }

  return FbtResult;
}(FbtResultBaseImpl);

module.exports = FbtResult;
/**
 * Copyright 2004-present Facebook. All Rights Reserved.
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
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var invariant = require('invariant'); // Similar to React$Node without `Iterable<React$Node>`


var hasImplementedStringishMethods = false; // Named _FbtResultBase to avoid colliding with `FbtResultBase` class definition in Flow

var _FbtResultBase =
/*#__PURE__*/
function () {
  // Declare that we'll implement these methods
  function _FbtResultBase(contents) {
    _classCallCheck(this, _FbtResultBase);

    _defineProperty(this, "_contents", void 0);

    _defineProperty(this, "_stringValue", void 0);

    _defineProperty(this, "anchor", void 0);

    _defineProperty(this, "big", void 0);

    _defineProperty(this, "blink", void 0);

    _defineProperty(this, "bold", void 0);

    _defineProperty(this, "charAt", void 0);

    _defineProperty(this, "charCodeAt", void 0);

    _defineProperty(this, "codePointAt", void 0);

    _defineProperty(this, "contains", void 0);

    _defineProperty(this, "endsWith", void 0);

    _defineProperty(this, "fixed", void 0);

    _defineProperty(this, "fontcolor", void 0);

    _defineProperty(this, "fontsize", void 0);

    _defineProperty(this, "includes", void 0);

    _defineProperty(this, "indexOf", void 0);

    _defineProperty(this, "italics", void 0);

    _defineProperty(this, "lastIndexOf", void 0);

    _defineProperty(this, "link", void 0);

    _defineProperty(this, "localeCompare", void 0);

    _defineProperty(this, "match", void 0);

    _defineProperty(this, "normalize", void 0);

    _defineProperty(this, "repeat", void 0);

    _defineProperty(this, "replace", void 0);

    _defineProperty(this, "search", void 0);

    _defineProperty(this, "slice", void 0);

    _defineProperty(this, "small", void 0);

    _defineProperty(this, "split", void 0);

    _defineProperty(this, "startsWith", void 0);

    _defineProperty(this, "strike", void 0);

    _defineProperty(this, "sub", void 0);

    _defineProperty(this, "substr", void 0);

    _defineProperty(this, "substring", void 0);

    _defineProperty(this, "sup", void 0);

    _defineProperty(this, "toLocaleLowerCase", void 0);

    _defineProperty(this, "toLocaleUpperCase", void 0);

    _defineProperty(this, "toLowerCase", void 0);

    _defineProperty(this, "toUpperCase", void 0);

    _defineProperty(this, "trim", void 0);

    _defineProperty(this, "trimLeft", void 0);

    _defineProperty(this, "trimRight", void 0);

    invariant(hasImplementedStringishMethods, 'Stringish methods must be implemented. See `usingStringProxyMethod`.');
    this._contents = contents;
    this._stringValue = null;
  }

  _createClass(_FbtResultBase, [{
    key: "flattenToArray",
    value: function flattenToArray() {
      return _FbtResultBase.flattenToArray(this._contents);
    }
  }, {
    key: "getContents",
    value: function getContents() {
      return this._contents;
    }
  }, {
    key: "onStringSerializationError",
    value: function onStringSerializationError(content) {
      throw new Error('This method needs to be overridden by a child class');
    }
  }, {
    key: "toString",
    value: function toString() {
      if (this._stringValue != null) {
        return this._stringValue;
      }

      var stringValue = '';
      var contents = this.flattenToArray();

      for (var ii = 0; ii < contents.length; ++ii) {
        var content = contents[ii];

        if (typeof content === 'string' || content instanceof _FbtResultBase) {
          stringValue += content.toString();
        } else {
          this.onStringSerializationError(content);
        }
      }

      if (!Object.isFrozen(this)) {
        this._stringValue = stringValue;
      }

      return stringValue;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.toString();
    }
  }], [{
    key: "flattenToArray",
    value: function flattenToArray(contents) {
      var result = [];

      for (var ii = 0; ii < contents.length; ++ii) {
        var content = contents[ii];

        if (Array.isArray(content)) {
          result.push.apply(result, _FbtResultBase.flattenToArray(content));
        } else if (content instanceof _FbtResultBase) {
          result.push.apply(result, content.flattenToArray());
        } else {
          result.push(content);
        }
      }

      return result;
    }
  }, {
    key: "usingStringProxyMethod",
    value: function usingStringProxyMethod( // $FlowFixMe We can't easily map the string method name to its corresponding signature
    stringProxyFn) {
      var currentClass = this; // Warning: The following methods are only appplicable during the transition
      // period for some existing code that uses string method on Fbt string.
      // The fbt string should be considered as the final string to be displayed
      // and therefore should not be manipulated.
      // The following methods are expected not to be supported soon.

      ['anchor', 'big', 'blink', 'bold', 'charAt', 'charCodeAt', 'codePointAt', 'contains', 'endsWith', 'fixed', 'fontcolor', 'fontsize', 'includes', 'indexOf', 'italics', 'lastIndexOf', 'link', 'localeCompare', 'match', 'normalize', 'repeat', 'replace', 'search', 'slice', 'small', 'split', 'startsWith', 'strike', 'sub', 'substr', 'substring', 'sup', 'toLocaleLowerCase', 'toLocaleUpperCase', 'toLowerCase', 'toUpperCase', 'trim', 'trimLeft', 'trimRight'].forEach(function (methodName) {
        /* eslint-disable fb-www/should-use-class */
        // $FlowFixMe Mock stringish methods
        currentClass.prototype[methodName] = stringProxyFn(methodName);
      });
      hasImplementedStringishMethods = true;
      return currentClass;
    }
  }]);

  return _FbtResultBase;
}();

module.exports = _FbtResultBase;
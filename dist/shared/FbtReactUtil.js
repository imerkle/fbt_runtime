"use strict";

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
var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;
var canDefineProperty = false;

if (__DEV__) {
  try {
    Object.defineProperty({}, 'x', {});
    canDefineProperty = true;
  } catch (_unused) {// IE will fail on defineProperty
  }
}

var FbtReactUtil = {
  REACT_ELEMENT_TYPE: REACT_ELEMENT_TYPE,
  defineProperty: function defineProperty(target, storeKey, value) {
    if (canDefineProperty) {
      Object.defineProperty(target, storeKey, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: value
      });
    } else {
      target[storeKey] = value;
    }
  }
};
module.exports = FbtReactUtil;
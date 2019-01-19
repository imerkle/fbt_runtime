"use strict";

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 * @format
 * 
 */
// Dummy implementation for Open Source with "detailed" logging turned
// off
var TURNED_OFF = {
  JS_RELIABILITY_FBT_LOGGING: true
};

function killswitch(feature) {
  return TURNED_OFF[feature];
}

module.exports = killswitch;
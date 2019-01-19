/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 * @format
 *       strict-local
 */
// Dummy implementation for Open Source with "detailed" logging turned
// off
const TURNED_OFF = {
  JS_RELIABILITY_FBT_LOGGING: true,
};
function killswitch(feature        ) {
  return TURNED_OFF[feature];
}
module.exports = killswitch;

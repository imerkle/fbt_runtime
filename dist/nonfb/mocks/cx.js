"use strict";

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 * @format
 * 
 */

/**
 * OSS mock implementation to work with our ported ("unmodulified")
 * CSS
 */
function cx(clsname) {
  return clsname.replace('/', '_');
}

module.exports = cx;
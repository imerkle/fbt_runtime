/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 * @format
 *       strict-local
 */

/**
 * OSS mock implementation to work with our ported ("unmodulified")
 * CSS
 */
function cx(clsname        ) {
  return clsname.replace('/', '_');
}
module.exports = cx;

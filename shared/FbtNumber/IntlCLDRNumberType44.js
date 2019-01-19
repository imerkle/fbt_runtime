/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @generated SignedSource<<cf2b5101f7bb3276867eb5c1704b3af3>>
 *
 * Generated by CLDRGenScript
 *
 *      
 */
const IntlVariations = require('IntlVariations');
const IntlCLDRNumberType44 = {
  getVariation(n        )         {
    if (n >= 0 && n <= 1) {
      return IntlVariations.NUMBER_ONE;
    } else {
      return IntlVariations.NUMBER_OTHER;
    }
  }
};

module.exports = IntlCLDRNumberType44;
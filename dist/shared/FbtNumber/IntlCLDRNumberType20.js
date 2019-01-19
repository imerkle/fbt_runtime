"use strict";

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @generated SignedSource<<54e80c59e35788062447a061445bb478>>
 *
 * Generated by CLDRGenScript
 *
 * 
 */
var IntlVariations = require('IntlVariations');

var IntlCLDRNumberType20 = {
  getVariation: function getVariation(n) {
    if (n % 10 === 1 && n % 100 !== 11) {
      return IntlVariations.NUMBER_ONE;
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) {
      return IntlVariations.NUMBER_FEW;
    } else {
      return IntlVariations.NUMBER_OTHER;
    }
  }
};
module.exports = IntlCLDRNumberType20;
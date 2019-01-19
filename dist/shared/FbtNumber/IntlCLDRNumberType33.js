"use strict";

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @generated SignedSource<<398b7b842a9f499685c82001ad13c094>>
 *
 * Generated by CLDRGenScript
 *
 * 
 */
var IntlVariations = require('IntlVariations');

var IntlCLDRNumberType33 = {
  getVariation: function getVariation(n) {
    if (n % 10 === 1) {
      return IntlVariations.NUMBER_ONE;
    } else if (n % 10 === 2) {
      return IntlVariations.NUMBER_TWO;
    } else if (n % 100 === 0 || n % 100 === 20 || n % 100 === 40 || n % 100 === 60 || n % 100 === 80) {
      return IntlVariations.NUMBER_FEW;
    } else {
      return IntlVariations.NUMBER_OTHER;
    }
  }
};
module.exports = IntlCLDRNumberType33;
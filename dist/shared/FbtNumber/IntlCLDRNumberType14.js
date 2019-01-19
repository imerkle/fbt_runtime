"use strict";

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @generated SignedSource<<1cadb07da07821b34a37eae4c3089024>>
 *
 * Generated by CLDRGenScript
 *
 * 
 */
var IntlVariations = require('IntlVariations');

var IntlCLDRNumberType14 = {
  getVariation: function getVariation(n) {
    if (n % 10 === 0 || n % 100 >= 11 && n % 100 <= 19) {
      return IntlVariations.NUMBER_ZERO;
    } else if (n % 10 === 1 && n % 100 !== 11) {
      return IntlVariations.NUMBER_ONE;
    } else {
      return IntlVariations.NUMBER_OTHER;
    }
  }
};
module.exports = IntlCLDRNumberType14;
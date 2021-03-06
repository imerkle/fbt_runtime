"use strict";

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @generated SignedSource<<84832656856be9321ec1fb0ca2c72c7c>>
 *
 * Generated by CLDRGenScript
 *
 * 
 */
var IntlVariations = require('IntlVariations');

var IntlCLDRNumberType19 = {
  getVariation: function getVariation(n) {
    if (n === 1) {
      return IntlVariations.NUMBER_ONE;
    } else if (n === 0 || n !== 1 && n % 100 >= 1 && n % 100 <= 19) {
      return IntlVariations.NUMBER_FEW;
    } else {
      return IntlVariations.NUMBER_OTHER;
    }
  }
};
module.exports = IntlCLDRNumberType19;
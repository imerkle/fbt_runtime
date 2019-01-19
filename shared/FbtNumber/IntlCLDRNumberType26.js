/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @generated SignedSource<<5b2cc9a6dffa0dda1e6619f603f1699c>>
 *
 * Generated by CLDRGenScript
 *
 *      
 */
const IntlVariations = require('IntlVariations');
const IntlCLDRNumberType26 = {
  getVariation(n        )         {
    if (n === 1) {
      return IntlVariations.NUMBER_ONE;
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) {
      return IntlVariations.NUMBER_FEW;
    } else {
      return IntlVariations.NUMBER_MANY;
    }
  }
};

module.exports = IntlCLDRNumberType26;

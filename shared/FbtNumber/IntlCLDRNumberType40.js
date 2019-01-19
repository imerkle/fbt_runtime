/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @generated SignedSource<<c7cff4f91f87c367882a81dcd4820b40>>
 *
 * Generated by CLDRGenScript
 *
 *      
 */
const IntlVariations = require('IntlVariations');
const IntlCLDRNumberType40 = {
  getVariation(n        )         {
    if (n === 1) {
      return IntlVariations.NUMBER_ONE;
    } else if (n === 2) {
      return IntlVariations.NUMBER_TWO;
    } else {
      return IntlVariations.NUMBER_OTHER;
    }
  }
};

module.exports = IntlCLDRNumberType40;

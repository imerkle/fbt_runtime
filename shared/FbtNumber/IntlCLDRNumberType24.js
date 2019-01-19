/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @generated SignedSource<<ab11c95db6b1f8af1cfba0c02466c048>>
 *
 * Generated by CLDRGenScript
 *
 *      
 */
const IntlVariations = require('IntlVariations');
const IntlCLDRNumberType24 = {
  getVariation(n        )         {
    if (n === 1) {
      return IntlVariations.NUMBER_ONE;
    } else if (n === 2) {
      return IntlVariations.NUMBER_TWO;
    } else if ((n < 0 || n > 10) && n % 10 === 0) {
      return IntlVariations.NUMBER_MANY;
    } else {
      return IntlVariations.NUMBER_OTHER;
    }
  }
};

module.exports = IntlCLDRNumberType24;

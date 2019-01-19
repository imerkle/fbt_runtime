/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @generated SignedSource<<9d2a59e3f384066f4d3da19de90ae2a6>>
 *
 * Generated by CLDRGenScript
 *
 *      
 */
const IntlVariations = require('IntlVariations');
const IntlCLDRNumberType13 = {
  getVariation(n        )         {
    if ((n === 1 || n === 2 || n === 3) || (n % 10 !== 4 && n % 10 !== 6 && n % 10 !== 9)) {
      return IntlVariations.NUMBER_ONE;
    } else {
      return IntlVariations.NUMBER_OTHER;
    }
  }
};

module.exports = IntlCLDRNumberType13;

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * Provides return values for fbt constructs calls. Here lives the platform
 * specific implementation.
 *
 * @emails oncall+internationalization
 * 
 * @format
 */
'use strict';

var FbtTableAccessor = {
  getEnumResult: function getEnumResult(value) {
    return [value, null];
  },
  getGenderResult: function getGenderResult(variation, substitution, value) {
    // value is ignored here which will be used in alternative implementation
    // for different platform
    return [variation, substitution];
  },
  getNumberResult: function getNumberResult(variation, substitution, value) {
    // value is ignored here which will be used in alternative implementation
    // for different platformf
    return [variation, substitution];
  },
  getPronounResult: function getPronounResult(genderKey) {
    return [[genderKey, '*'], null];
  }
};
module.exports = FbtTableAccessor;
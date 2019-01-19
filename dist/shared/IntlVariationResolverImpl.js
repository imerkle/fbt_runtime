"use strict";

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 * @format
 * 
 */
var IntlNumberType = require('IntlNumberType');

var IntlVariations = require('IntlVariations');

var IntlViewerContext = require('IntlViewerContext');

var invariant = require('invariant');

var EXACTLY_ONE = '_1';
var IntlVariationResolverImpl = {
  EXACTLY_ONE: EXACTLY_ONE,

  /**
   * Wrapper around FbtNumberType.getVariation that special cases our EXACTLY_ONE
   * value to accommodate the singular form of fbt:plural
   */
  getNumberVariations: function getNumberVariations(number) {
    /* eslint-disable no-bitwise */
    var numType = IntlNumberType.get(IntlViewerContext.locale).getVariation(number);
    invariant(numType & IntlVariations.BITMASK_NUMBER, 'Invalid number provided');
    return number === 1 ? [EXACTLY_ONE, numType, '*'] : [numType, '*'];
  },

  /**
   * Wrapper to validate gender.
   */
  getGenderVariations: function getGenderVariations(gender) {
    /* eslint-disable no-bitwise */
    invariant(gender & IntlVariations.BITMASK_GENDER, 'Invalid gender provided');
    return [gender, '*'];
  }
};
module.exports = IntlVariationResolverImpl;
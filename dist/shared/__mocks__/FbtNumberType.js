"use strict";

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 * 
 * @emails oncall+internationalization
 */
var IntlCLDRNumberType04 = jest.requireActual('IntlCLDRNumberType04');
var FbtNumberType = {
  getVariation: jest.fn(function (n) {
    return IntlCLDRNumberType04.getVariation(n);
  })
};
module.exports = FbtNumberType;
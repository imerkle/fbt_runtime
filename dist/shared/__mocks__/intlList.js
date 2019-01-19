"use strict";

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 * 
 * @emails oncall+internationalization
 */
var intlList = jest.fn(function (items, conjunction, delimiter) {
  return items.join(conjunction || ',');
});
var CONJUNCTIONS = intlList.CONJUNCTIONS = {
  AND: '&',
  OR: '|',
  NONE: ''
};
var DELIMITERS = intlList.DELIMITERS = {
  COMMA: 'COMMA',
  SEMICOLON: 'SEMICOLON'
};
module.exports = intlList;
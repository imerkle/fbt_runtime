/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * Dummy class on www. Fetches translations from language packs on RN/CS.
 *
 * @emails oncall+internationalization
 * 
 * @format
 */
'use strict';

var IntlViewerContext = require('IntlViewerContext');

var translatedFbts = require('../../../../src/translatedFbts.json');

function getTranslatedPayload(hashKey, enumHashKey, args) {
  var table = translatedFbts && translatedFbts[IntlViewerContext.locale];

  if (!table || !table[hashKey]) {
    return null;
  }

  return {
    table: table[hashKey],
    args: args
  };
}

function isComponentScript() {
  return false;
}

module.exports = {
  getTranslatedPayload: getTranslatedPayload,
  isComponentScript: isComponentScript
};
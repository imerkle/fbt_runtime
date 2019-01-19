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

const IntlViewerContext = require('IntlViewerContext');

const translatedFbts = require('translatedFbts.json');

function getTranslatedPayload(
  hashKey         ,
  enumHashKey            ,
  args                   ,
)             {
  const table = translatedFbts && translatedFbts[IntlViewerContext.locale];
  if (!table || !table[hashKey]) {
    return null;
  }
  return {
    table: table[hashKey],
    args: args,
  };
}

function isComponentScript()          {
  return false;
}

module.exports = {getTranslatedPayload, isComponentScript};

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This file is shared between www and fbsource and www is the source of truth.
 * When you make change to this file on www, please make sure you test it on
 * fbsource and send a diff to update the files too so that the 2 versions are
 * kept in sync.
 *
 * Run the following command to sync the change from www to fbsource.
 *   js1 upgrade www-shared -p fbt --remote localhost:~/www
 *
 * @format
 * 
 * @emails oncall+internationalization
 */
'use strict';

var fbt = require('fbt');

var intlNumUtils = require('intlNumUtils');

function formatNumber(value, decimals) {
  return intlNumUtils.formatNumber(value, decimals);
}

function getAtLeastString(maxnumber, decimals) {
  var result = React.createElement("fbt", {
    desc: "Label with meaning 'at least number'",
    project: "locale_data"
  }, React.createElement("fbtParam", {
    name: "number",
    number: maxnumber
  }, intlNumUtils.formatNumberWithThousandDelimiters(maxnumber, decimals)), "+"); // after we start using CLDR data, it will not be fbt anymore.

  return result.toString();
}

function getLessThanString(minnumber, decimals) {
  var result = React.createElement("fbt", {
    desc: "Label with meaning 'less than number'",
    project: "locale_data"
  }, "<", React.createElement("fbtParam", {
    name: "number",
    number: minnumber
  }, intlNumUtils.formatNumberWithThousandDelimiters(minnumber, decimals))); // after we start using CLDR data, it will not be fbt anymore.

  return result.toString();
}

function formatNumberWithMaxLimit(value, maxvalue, decimals) {
  return value > maxvalue ? getAtLeastString(maxvalue, decimals) : intlNumUtils.formatNumberWithThousandDelimiters(value, decimals);
}

function formatNumberWithMinLimit(value, minvalue, decimals) {
  return value < minvalue ? getLessThanString(minvalue, decimals) : intlNumUtils.formatNumberWithThousandDelimiters(value, decimals);
}

formatNumber.withThousandDelimiters = intlNumUtils.formatNumberWithThousandDelimiters;
formatNumber.withMaxLimit = formatNumberWithMaxLimit;
formatNumber.withMinLimit = formatNumberWithMinLimit;
module.exports = formatNumber;
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * Flow doesn't know about the transformations of fbt() calls into tables, so
 * all it sees is that callers are adding strings and arrays, which isn't
 * allowed so flow for this file is ignored in .flowconfig.
 *
 * This file is shared between www and fbsource and www is the source of truth.
 * When you make change to this file on www, please make sure you test it on
 * fbsource and send a diff to update the files too so that the 2 versions are
 * kept in sync.
 *
 * Run the following command to sync the change from www to fbsource.
 *   js1 upgrade www-shared -p fbt --remote localhost:~/www
 *
 * 
 * @typechecks
 * @format
 * @emails oncall+internationalization
 */

/* eslint max-len: ["warn", 120] */

/* eslint "fb-www/avoid-this-outside-classes": "off" */

/* eslint "fb-www/order-requires": "off" */

/* eslint "fb-www/require-flow-strict-local": "off" */
var Banzai = require('Banzai');

var _require = require('FbtLogger'),
    logger = _require.logger;

var _require2 = require('FbtQTOverrides'),
    overrides = _require2.overrides;

var FbtTableAccessor = require('FbtTableAccessor');

var FbtResult = require('FbtResult');

var FbtResultGK = require('FbtResultGK');

var GenderConst = require('GenderConst');

var _require3 = require('FbtTranslations'),
    getTranslatedPayload = _require3.getTranslatedPayload,
    isComponentScript = _require3.isComponentScript;

var InlineFbtResult = require('InlineFbtResult');

var IntlViewerContext = require('IntlViewerContext');

var intlNumUtils = require('intlNumUtils');

var invariant = require('invariant');

var substituteTokens = require('substituteTokens');

var _require4 = require('IntlVariationResolver'),
    getNumberVariations = _require4.getNumberVariations,
    getGenderVariations = _require4.getGenderVariations; // Used only in React Native


var jsonExportMode = false;
/**
 * fbt.XXX calls return arguments in the form of
 * [<INDEX>, <SUBSTITUTION>] to be processed by fbt._
 */

var ARG = {
  INDEX: 0,
  SUBSTITUTION: 1
};
var VARIATIONS = {
  NUMBER: 0,
  GENDER: 1
}; // Must match ValidPronounUsages in FbtConstants.js

var PRONOUN_USAGE = {
  OBJECT: 0,
  POSSESSIVE: 1,
  REFLEXIVE: 2,
  SUBJECT: 3
};
var _cachedFbtResults = {};

var fbt = function fbt() {};
/**
 * fbt._() iterates through all indices provided in `args` and accesses
 * the relevant entry in the `table` resulting in the appropriate
 * pattern string.  It then substitutes all relevant substitutions.
 *
 * @param {string|object|array} table - Example: {
 *   "singular": "You have a cat in a photo album named {title}",
 *   "plural": "You have cats in a photo album named {title}"
 * }
 * -or-
 * {
 *   "singular": ["You have a cat in a photo album named {title}", <hash>],
 *   "plural": ["You have cats in a photo album named {title}", <hash>]
 * }
 *
 * or table can simply be a pattern string:
 *   "You have a cat in a photo album named {title}"
 * -or-
 *    ["You have a cat in a photo album named {title}", <hash>]
 *
 * @param {?array<array>} args - arguments from which to pull substitutions
 *    Example: [["singular", null], [null, {title: "felines!"}]]
 *
 * @param {?object} options - options for runtime
 * translation dictionary access. hk stands for hash key which is used to look
 * up translated payload in React Native. ehk stands for enum hash key which
 * contains a structured enums to hash keys map which will later be traversed
 * to look up enum-less translated payload.
 */


fbt._ = function (table, args, options) {
  if (options && (options.hk || options.ehk)) {
    if (jsonExportMode) {
      return {
        text: table,
        fbt: true,
        hashKey: options.hk
      };
    }

    var _ref = getTranslatedPayload(options.hk, options.ehk, args) || {
      table: table,
      args: args
    };

    table = _ref.table;
    args = _ref.args;
  } // [fbt_impressions]
  // If this is a string literal (no tokens to substitute) then 'args' is empty
  // and the logic will skip the table traversal.
  // [table traversal]
  // At this point we assume that table is a hash (possibly nested) that we
  // need to traverse in order to pick the correct string, based on the
  // args that follow.


  var allSubstitutions = {};
  var pattern = table;

  if (table.__vcg) {
    args = args || [];
    args.unshift([getGenderVariations(IntlViewerContext.GENDER), null]);
  }

  if (args) {
    if (typeof pattern !== 'string') {
      // On mobile, table can be accessed at the native layer when fetching
      // translations. If pattern is not a string here, table has not been accessed
      pattern = this._accessTable(table, args, 0);
    }

    allSubstitutions = Object.assign.apply(Object, [{}].concat(_toConsumableArray(args.map(function (arg) {
      return arg[ARG.SUBSTITUTION] || {};
    }))));
    invariant(pattern !== null, 'Table access failed');
  }

  var patternString = pattern;
  var patternHash = null;
  var csError = isComponentScript() ? '\nNote: Certain fbt constructs such as fbt.plural() and the third ' + 'positional `variations` argument to fbt.param() are currently disallowed' : '';
  invariant(typeof pattern === 'string' || Array.isArray(pattern), 'Table access did not result in string: %s. %s', JSON.stringify(pattern), csError);

  if (Array.isArray(pattern)) {
    // [fbt_impressions]
    // When logging of string impressions is enabled, the string and it's hash
    // is packaged in an array. We want to log the hash
    patternString = pattern[0];
    patternHash = pattern[1]; // Append '1_' for appid's prepended to our i18n hash
    // (see intl_get_application_id)

    var stringID = '1_' + patternHash;
    patternString = overrides[stringID] || patternString;

    if (overrides[stringID]) {
      fbt.logQTImpression(patternHash);
    }

    fbt.logImpression(patternHash);
  }

  var cachedFbt = _cachedFbtResults[patternString];

  var hasSubstitutions = this._hasKeys(allSubstitutions);

  if (cachedFbt && !hasSubstitutions) {
    return cachedFbt;
  } else {
    var fbtContent = substituteTokens(patternString, allSubstitutions);

    var result = this._wrapContent(fbtContent, patternString, patternHash);

    if (!hasSubstitutions) {
      _cachedFbtResults[patternString] = result;
    }

    return result;
  }
};

if (__DEV__) {
  fbt._getCachedFbt = function (s) {
    return _cachedFbtResults[s];
  };
}
/**
 * fbt._hasKeys takes an object and returns whether it has 0
 * keys. It purposefully avoids creating the temporary arrays
 * incurred by calling Object.keys(o)
 * @param {Object} o - Example: "allSubstitutions"
 */


fbt._hasKeys = function (o) {
  for (var k in o) {
    return true;
  }

  return false;
};
/**
 * Performs a depth-first search on our table, attempting to access
 * each table entry.  The first entry found is the one we want, as we
 * set defaults after preferred indices.  For example:
 *
 * @param {?string|object|array} table - {
 *   // viewer gender
 *   '*': {
 *     // {num} plural
 *     '*': {
 *       // user-defined enum
 *       LIKE: '{num} people liked your update',
 *       COMMENT: '{num} people commented on your update',
 *       POST: '{num} people posted on a wall',
 *     },
 *     SINGULAR: {
 *       LIKE: '{num} person liked your update',
 *       // ...
 *     },
 *     DUAL: { ... }
 *   },
 *   FEMALE: {
 *     // {num} plural
 *     '*': { ... },
 *     SINGULAR: { ... },
 *     DUAL: { ... }
 *   },
 *   MALE: { ... }
 * }
 *
 * Notice that LIKE and COMMENT here both have 'your' in them, whereas
 * POST doesn't.  The fallback ('*') translation for POST will be the same
 * in both the male and female version, so that entry won't exist under
 *   table[FEMALE]['*'] or table[MALE]['*'].
 *
 * Similarly, PLURAL is a number variation that never appears in the table as it
 * is the default/fallback.
 *
 * For example, if we have a female viewer, and a PLURAL number and a POST enum
 * value, in the above example, we'll first attempt to get:
 * table[FEMALE][PLURAL][POST].  undefined. Back Up, attempting to get
 * table[FEMALE]['*'][POST].  undefined also. since it's the same as the '*'
 * table['*'][PLURAL][POST].  ALSO undefined. Deduped to '*'
 * table['*']['*'][POST].  There it is.
 *
 * @param {array}  args          fbt runtime arguments
 * @param {number} argsIndex     argument index we're currently visiting
 */


fbt._accessTable = function (table, args, argsIndex) {
  // Either we've reached the end of our arguments at a valid entry, in which
  // case table is now a string (leaf) or we've accessed a key that didn't exist
  // in the table, in which case we return null
  if (argsIndex >= args.length) {
    return table;
  } else if (table == null) {
    return null;
  }

  var pattern = null;
  var arg = args[argsIndex];
  var tableIndex = arg[ARG.INDEX]; // Do we have a variation? Attempt table access in variation order

  if (Array.isArray(tableIndex)) {
    for (var k = 0; k < tableIndex.length; ++k) {
      var subTable = table[tableIndex[k]];
      pattern = this._accessTable(subTable, args, argsIndex + 1);

      if (pattern != null) {
        break;
      }
    }
  } else {
    table = tableIndex !== null ? table[tableIndex] : table;
    pattern = this._accessTable(table, args, argsIndex + 1);
  }

  return pattern;
};
/**
 * fbt._enum() takes an enum value and returns a tuple in the format:
 * [value, null]
 * @param {string|number} value - Example: "id1"
 * @param {object} range - Example: {"id1": "groups", "id2": "videos", ...}
 */


fbt._enum = function (value, range) {
  if (__DEV__) {
    invariant(value in range, 'invalid value: %s', value);
  }

  return FbtTableAccessor.getEnumResult(value);
};
/**
 * fbt._subject() takes a gender value and returns a tuple in the format:
 * [variation, null]
 * @param {number} value - Example: "16777216"
 */


fbt._subject = function (value) {
  return FbtTableAccessor.getGenderResult(getGenderVariations(value), null, value);
};
/**
 * fbt._param() takes a `label` and `value` returns a tuple in the format:
 * [?variation, {label: "replaces {label} in pattern string"}]
 * @param {string} label - Example: "label"
 * @param {?string|number|object|array|DOMElement} value
 *   - E.g. 'replaces {label} in pattern'
 * @param {?array} variations
 *   - E.g. [0], [0,count], or [0,foo.someNumber() + 1]
 */


fbt._param = function (label, value, variations) {
  var variation = null;

  var substitution = _defineProperty({}, label, value);

  if (variations) {
    if (variations[0] === VARIATIONS.NUMBER) {
      var number = variations.length > 1 ? variations[1] : value;
      invariant(typeof number === 'number', 'fbt.param expected number');
      variation = getNumberVariations(number);

      if (typeof value === 'number') {
        substitution[label] = intlNumUtils.formatNumberWithThousandDelimiters(value);
      }

      return FbtTableAccessor.getNumberResult(variation, substitution, number);
    } else if (variations[0] === VARIATIONS.GENDER) {
      invariant(variations.length > 1, 'expected gender value');
      var gender = variations[1];
      variation = getGenderVariations(gender);
      return FbtTableAccessor.getGenderResult(variation, substitution, gender);
    } else {
      invariant(false, 'Unknown invariant mask');
    }
  } else {
    return [variation, substitution];
  }
};
/**
 * fbt._plural() takes a `count` and 2 optional params: `label` and `value`.
 * It returns a tuple in the format:
 * [?variation, {label: "replaces {label} in pattern string"}]
 * @param {number} count - Example: 2
 * @param {?string} label
 *   - E.g. 'replaces {number} in pattern'
 * @param {?string} value
 *   - The value to use (instead of count) for replacing {label}
 */


fbt._plural = function (count, label, value) {
  var variation = getNumberVariations(count);
  var substitution = {};

  if (label) {
    if (typeof value === 'number') {
      substitution[label] = intlNumUtils.formatNumberWithThousandDelimiters(value);
    } else {
      substitution[label] = value || intlNumUtils.formatNumberWithThousandDelimiters(count);
    }
  }

  return FbtTableAccessor.getNumberResult(variation, substitution, count);
};
/**
 * fbt._pronoun() takes a 'usage' string and a GenderConst value and returns a tuple in the format:
 * [variations, null]
 * @param {number} usage - Example: PRONOUN_USAGE.object.
 * @param {number} gender - Example: GenderConst.MALE_SINGULAR
 * @param {?object} options - Example: { human: 1 }
 */


fbt._pronoun = function (usage, gender, options) {
  invariant(gender !== GenderConst.NOT_A_PERSON || !options || !options.human, 'Gender cannot be GenderConst.NOT_A_PERSON if you set "human" to true');
  var genderKey = getPronounGenderKey(usage, gender);
  return FbtTableAccessor.getPronounResult(genderKey);
}; // See JSFbtTable::getPronounGenderKey().


function getPronounGenderKey(usage, gender) {
  switch (gender) {
    case GenderConst.NOT_A_PERSON:
      return usage === PRONOUN_USAGE.OBJECT || usage === PRONOUN_USAGE.REFLEXIVE ? GenderConst.NOT_A_PERSON : GenderConst.UNKNOWN_PLURAL;

    case GenderConst.FEMALE_SINGULAR:
    case GenderConst.FEMALE_SINGULAR_GUESS:
      return GenderConst.FEMALE_SINGULAR;

    case GenderConst.MALE_SINGULAR:
    case GenderConst.MALE_SINGULAR_GUESS:
      return GenderConst.MALE_SINGULAR;

    case GenderConst.MIXED_SINGULAR: // And MIXED_PLURAL; they have the same integer values.

    case GenderConst.FEMALE_PLURAL:
    case GenderConst.MALE_PLURAL:
    case GenderConst.NEUTER_PLURAL:
    case GenderConst.UNKNOWN_PLURAL:
      return GenderConst.UNKNOWN_PLURAL;

    case GenderConst.NEUTER_SINGULAR:
    case GenderConst.UNKNOWN_SINGULAR:
      return usage === PRONOUN_USAGE.REFLEXIVE ? GenderConst.NOT_A_PERSON : GenderConst.UNKNOWN_PLURAL;
  } // Mirrors the behavior of :fbt:pronoun when an unknown gender value is given.


  return GenderConst.NOT_A_PERSON;
}
/**
 * fbt.name() takes a `label`, `value`, and `gender` and
 * returns a tuple in the format:
 * [gender, {label: "replaces {label} in pattern string"}]
 * @param {string} label - Example: "label"
 * @param {?string|number|object|array|DOMElement} value
 *   - E.g. 'replaces {label} in pattern'
 * @param {number} gender - Example: "IntlVariations.GENDER_FEMALE"
 */


fbt._name = function (label, value, gender) {
  var variation = getGenderVariations(gender);
  var substitution = {};
  substitution[label] = value;
  return FbtTableAccessor.getGenderResult(variation, substitution, gender);
};
/**
 * In www, fbt.logImpression() takes a string hash and logs it using BanzaiLogger,
 * via the Logger config 'FbtImpressionsLoggerConfig'.
 * @param {string} hash
 */


fbt.logImpression = function (hash) {
  if (logger) {
    logger.logImpression(hash);
  }

  return hash;
};

fbt.logQTImpression = function (hash) {
  Banzai.post('intl_qt_event', {
    hash: hash
  });
  return hash;
};

fbt._wrapContent = function (fbtContent, patternString, patternHash) {
  // TODO #20587740: Remove this conditional block. Currently unit tests rely
  // on shouldReturnFbtResult being mocked to false and results being unwrapped.
  if (!FbtResultGK.shouldReturnFbtResult && FbtResultGK.inlineMode !== 'REPORT') {
    return fbtContent;
  }

  var contents = typeof fbtContent === 'string' ? [fbtContent] : fbtContent;

  if (FbtResultGK.inlineMode && FbtResultGK.inlineMode !== 'NO_INLINE') {
    return new InlineFbtResult(contents, FbtResultGK.inlineMode, patternString, patternHash);
  }

  return new FbtResult(contents);
};

fbt.enableJsonExportMode = function () {
  jsonExportMode = true;
};

fbt.disableJsonExportMode = function () {
  jsonExportMode = false;
};

module.exports = fbt;
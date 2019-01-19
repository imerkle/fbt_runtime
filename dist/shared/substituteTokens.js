"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
var IntlPunctuation = require('IntlPunctuation');

var invariant = require('invariant'); // This pattern finds tokens inside a string: 'string with {token} inside'.
// It also grabs any punctuation that may be present after the token, such as
// brackets, fullstops and elipsis (for various locales too!)


var parameterRegexp = new RegExp('\\{([^}]+)\\}(' + IntlPunctuation.PUNCT_CHAR_CLASS + '*)', 'g'); // Hack into React internals to avoid key warnings

function markAsSafeForReact(object) {
  if (__DEV__) {
    // If this looks like a ReactElement, mark it as safe to silence any
    // key warnings.
    // I use a string key to avoid any possible private variable transforms.
    var storeKey = '_store';

    if (object.type && _typeof(object.props) === 'object' && _typeof(object[storeKey]) === 'object' && typeof object[storeKey].validated === 'boolean') {
      object[storeKey].validated = true;
    }
  }

  return object;
}
/**
 * Does the token substitution fbt() but without the string lookup.
 * Used for in-place substitutions in translation mode.
 */


function substituteTokens(template, _args) {
  var args = _args;

  if (!args) {
    return template;
  }

  invariant(_typeof(args) === 'object', 'The 2nd argument must be an object (not a string) for tx(%s, ...)', template); // Splice in the arguments while keeping rich object ones separate.

  var objectPieces = [];
  var argNames = [];
  var stringPieces = template.replace(parameterRegexp, function (match, parameter, punctuation) {
    if (__DEV__) {
      if (!args.hasOwnProperty(parameter)) {
        throw new Error('Translatable string expects parameter ' + parameter);
      }
    }

    var argument = args[parameter];

    if (argument && _typeof(argument) === 'object') {
      objectPieces.push(argument);
      argNames.push(parameter); // End of Transmission Block sentinel marker

      return '\x17' + punctuation;
    } else if (argument === null) {
      return '';
    }

    return argument + (IntlPunctuation.endsInPunct(argument) ? '' : punctuation);
  }).split('\x17').map(IntlPunctuation.applyPhonologicalRules);

  if (stringPieces.length === 1) {
    return stringPieces[0];
  } // Zip together the lists of pieces.


  var pieces = [stringPieces[0]];

  for (var i = 0; i < objectPieces.length; i++) {
    pieces.push(markAsSafeForReact(objectPieces[i]), stringPieces[i + 1]);
  }

  return pieces;
}

module.exports = substituteTokens;
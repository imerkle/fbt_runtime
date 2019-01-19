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
 * Renders a list of items, similar to :fbt:large-list / :intl:large-list. This
 * is similar to doing .join(', ') but is culturally-aware (uses fbt calls) and
 * by default prepends a conjunction ("and" or "or") to the final item. This
 * conjunction is optional.
 *
 * @format
 * @fbt {"project": "intl-core"}
 * @typechecks
 * 
 * @emails oncall+internationalization
 */
'use strict';

var React = require('React');

var fbt = require('fbt');

var invariant = require('invariant');

var CONJUNCTIONS = {
  AND: 'AND',
  NONE: 'NONE',
  OR: 'OR'
};
var DELIMITERS = {
  COMMA: 'COMMA',
  SEMICOLON: 'SEMICOLON'
};

var intlList = function intlList(items, conjunction, delimiter) {
  if (true) {
    items.forEach(function (item) {
      invariant(typeof item === 'string' || React.isValidElement(item), 'Must provide a string or ReactComponent to intlList.');
    });
  }

  conjunction = conjunction || CONJUNCTIONS.AND;
  delimiter = delimiter || DELIMITERS.COMMA;
  var count = items.length;

  if (count === 0) {
    return '';
  } else if (count === 1) {
    return items[0];
  }

  var lastItem = items[count - 1];
  var output = items[0];

  for (var i = 1; i < count - 1; ++i) {
    switch (delimiter) {
      case DELIMITERS.SEMICOLON:
        output = React.createElement("fbt", {
          desc: 'A list of items of various types, for example: ' + '"Menlo Park, CA; Seattle, WA; New York City, NY". ' + '{previous items} and {following items} are themselves ' + 'lists that contain one or more items.'
        }, React.createElement("fbtParam", {
          name: "previous items"
        }, output), '; ', React.createElement("fbtParam", {
          name: "following items"
        }, items[i]));
        break;

      default:
        output = React.createElement("fbt", {
          desc: 'A list of items of various types. {previous items} and' + ' {following items} are themselves lists that contain one or' + ' more items.'
        }, React.createElement("fbtParam", {
          name: "previous items"
        }, output), ', ', React.createElement("fbtParam", {
          name: "following items"
        }, items[i]));
    }
  }

  return _getConjunction(output, lastItem, conjunction, delimiter);
};

function _getConjunction(list, lastItem, conjunction, delimiter) {
  switch (conjunction) {
    case CONJUNCTIONS.AND:
      return React.createElement("fbt", {
        desc: 'A list of items of various types, for example:' + ' "item1, item2, item3 and item4"'
      }, React.createElement("fbtParam", {
        name: "list of items"
      }, list), "and", React.createElement("fbtParam", {
        name: "last item"
      }, lastItem));

    case CONJUNCTIONS.OR:
      return React.createElement("fbt", {
        desc: 'A list of items of various types, for example:' + ' "item1, item2, item3 or item4"'
      }, React.createElement("fbtParam", {
        name: "list of items"
      }, list), "or", React.createElement("fbtParam", {
        name: "last item"
      }, lastItem));

    case CONJUNCTIONS.NONE:
      switch (delimiter) {
        case DELIMITERS.SEMICOLON:
          return React.createElement("fbt", {
            desc: 'A list of items of various types, for example:' + ' "Menlo Park, CA; Seattle, WA; New York City, NY". ' + '{previous items} itself contains one or more items.'
          }, React.createElement("fbtParam", {
            name: "previous items"
          }, list), '; ', React.createElement("fbtParam", {
            name: "last item"
          }, lastItem));

        default:
          return React.createElement("fbt", {
            desc: 'A list of items of various types, for example:' + ' "item1, item2, item3, item4"'
          }, React.createElement("fbtParam", {
            name: "list of items"
          }, list), ', ', React.createElement("fbtParam", {
            name: "last item"
          }, lastItem));
      }

    default:
      invariant(false, 'Invalid conjunction %s provided to intlList', conjunction);
  }
}

intlList.DELIMITERS = DELIMITERS;
intlList.CONJUNCTIONS = CONJUNCTIONS;
module.exports = intlList;
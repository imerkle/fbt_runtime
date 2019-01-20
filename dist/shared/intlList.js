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
        output = fbt._("{previous items}; {following items}", [fbt._param("previous items", output), fbt._param("following items", items[i])], {
          hk: "4hs4xq"
        });
        break;

      default:
        output = fbt._("{previous items}, {following items}", [fbt._param("previous items", output), fbt._param("following items", items[i])], {
          hk: "2z8RMb"
        });
    }
  }

  return _getConjunction(output, lastItem, conjunction, delimiter);
};

function _getConjunction(list, lastItem, conjunction, delimiter) {
  switch (conjunction) {
    case CONJUNCTIONS.AND:
      return fbt._("{list of items} and {last item}", [fbt._param("list of items", list), fbt._param("last item", lastItem)], {
        hk: "17bm9d"
      });

    case CONJUNCTIONS.OR:
      return fbt._("{list of items} or {last item}", [fbt._param("list of items", list), fbt._param("last item", lastItem)], {
        hk: "3q8AmB"
      });

    case CONJUNCTIONS.NONE:
      switch (delimiter) {
        case DELIMITERS.SEMICOLON:
          return fbt._("{previous items}; {last item}", [fbt._param("previous items", list), fbt._param("last item", lastItem)], {
            hk: "3i6hSW"
          });

        default:
          return fbt._("{list of items}, {last item}", [fbt._param("list of items", list), fbt._param("last item", lastItem)], {
            hk: "3Q0iaX"
          });
      }

    default:
      invariant(false, 'Invalid conjunction %s provided to intlList', conjunction);
  }
}

intlList.DELIMITERS = DELIMITERS;
intlList.CONJUNCTIONS = CONJUNCTIONS;
module.exports = intlList;
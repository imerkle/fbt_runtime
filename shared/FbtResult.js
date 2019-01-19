/**
 * Copyright 2015-present Facebook. All Rights Reserved.
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
 *       strict-local
 * @emails oncall+internationalization
 */

                                                         

const FbtReactUtil = require('FbtReactUtil');
const FbtResultBaseImpl = require('FbtResultBaseImpl');

const FbtComponent = (props       )        => props.content;

              
                                 
  

class FbtResult extends FbtResultBaseImpl {
  $$typeof                                     =
    FbtReactUtil.REACT_ELEMENT_TYPE;
  key          = null;
               
  ref                                = null;
  type                          = FbtComponent;

  constructor(contents                       ) {
    super(contents);
    /* eslint-disable fb-www/react-state-props-mutation */
    this.props = {
      content: contents,
    };

    if (__DEV__) {
      FbtReactUtil.defineProperty(this, '_store', {validated: true});
    }
  }
}

module.exports = FbtResult;

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 *      
 * @format
 * @emails oncall+internationalization
 */

'use strict';

             
                                    
                                                  
                       

                                             
                                                           

const FBLogger = require('FBLogger');
const FbtResultBase = require('FbtResultBase');
const killswitch = require('killswitch');

function logErrorUseStringMethod(methodName        )       {
  // If the contents is array of length greater than one, then use the string
  // method will cause error
  FBLogger('fbt')
    .blameToPreviousFile()
    .mustfix(
      'Error using fbt string. Used method %s' +
        ' on Fbt string. Fbt string is designed to be immutable ' +
        'and should not be manipulated.',
      methodName,
    );
}

/**
 * The FbtResultBase "implemented" module for www.
 */
class FbtResultWWW extends FbtResultBase {
  onStringSerializationError(content                )       {
    let details = 'Context not logged.';
    if (!killswitch('JS_RELIABILITY_FBT_LOGGING')) {
      try {
        details = JSON.stringify(content).substr(0, 250);
      } catch (err) {
        // Catching circular reference error
        details = err.message;
      }
    }
    FBLogger('fbt')
      .blameToPreviousFile()
      .mustfix('Converting to a string will drop content data. %s', details);
  }
}

const FbtResultWWWWithStringishMethods = FbtResultWWW.usingStringProxyMethod(
  (methodName                      ) => {
    return function() {
      logErrorUseStringMethod(methodName);
      // $FlowFixMe Mock stringish methods
      return String.prototype[methodName].apply(this, arguments);
    };
  },
);

module.exports = FbtResultWWWWithStringishMethods;
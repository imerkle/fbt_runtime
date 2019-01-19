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

const invariant = require('invariant');

// Similar to React$Node without `Iterable<React$Node>`
                            
           
              
                       
             
        
          
                                                
                      
                
          
         

                                          
                                         
  

let hasImplementedStringishMethods = false;

// Named _FbtResultBase to avoid colliding with `FbtResultBase` class definition in Flow
class _FbtResultBase                           {
                                   
                        

  // Declare that we'll implement these methods
                                                  
                                            
                                                
                                              
                                                  
                                                          
                                                            
                                                      
                                                      
                                                
                                                        
                                                      
                                                      
                                                    
                                                    
                                                            
                                              
                                                                
                                                
                                                        
                                                  
                                                    
                                                  
                                                
                                                
                                                
                                                          
                                                  
                                            
                                                  
                                                        
                                            
                                                                        
                                                                        
                                                            
                                                            
                                              
                                                      
                                                        

  constructor(contents                       ) {
    invariant(
      hasImplementedStringishMethods,
      'Stringish methods must be implemented. See `usingStringProxyMethod`.',
    );
    this._contents = contents;
    this._stringValue = null;
  }

  flattenToArray()                        {
    return _FbtResultBase.flattenToArray(this._contents);
  }

  getContents() {
    return this._contents;
  }

  onStringSerializationError(content                )       {
    throw new Error('This method needs to be overridden by a child class');
  }

  toString()         {
    if (this._stringValue != null) {
      return this._stringValue;
    }
    let stringValue = '';
    const contents = this.flattenToArray();
    for (let ii = 0; ii < contents.length; ++ii) {
      const content = contents[ii];
      if (typeof content === 'string' || content instanceof _FbtResultBase) {
        stringValue += content.toString();
      } else {
        this.onStringSerializationError(content);
      }
    }
    if (!Object.isFrozen(this)) {
      this._stringValue = stringValue;
    }
    return stringValue;
  }

  toJSON()         {
    return this.toString();
  }

  static flattenToArray(
    contents                       ,
  )                        {
    const result = [];
    for (let ii = 0; ii < contents.length; ++ii) {
      const content = contents[ii];
      if (Array.isArray(content)) {
        result.push.apply(result, _FbtResultBase.flattenToArray(content));
      } else if (content instanceof _FbtResultBase) {
        result.push.apply(result, content.flattenToArray());
      } else {
        result.push(content);
      }
    }
    return result;
  }

  static usingStringProxyMethod(
    // $FlowFixMe We can't easily map the string method name to its corresponding signature
    stringProxyFn                                                      ,
  )                        {
    const currentClass = this;
    // Warning: The following methods are only appplicable during the transition
    // period for some existing code that uses string method on Fbt string.
    // The fbt string should be considered as the final string to be displayed
    // and therefore should not be manipulated.
    // The following methods are expected not to be supported soon.
    [
      'anchor',
      'big',
      'blink',
      'bold',
      'charAt',
      'charCodeAt',
      'codePointAt',
      'contains',
      'endsWith',
      'fixed',
      'fontcolor',
      'fontsize',
      'includes',
      'indexOf',
      'italics',
      'lastIndexOf',
      'link',
      'localeCompare',
      'match',
      'normalize',
      'repeat',
      'replace',
      'search',
      'slice',
      'small',
      'split',
      'startsWith',
      'strike',
      'sub',
      'substr',
      'substring',
      'sup',
      'toLocaleLowerCase',
      'toLocaleUpperCase',
      'toLowerCase',
      'toUpperCase',
      'trim',
      'trimLeft',
      'trimRight',
    ].forEach(methodName => {
      /* eslint-disable fb-www/should-use-class */
      // $FlowFixMe Mock stringish methods
      currentClass.prototype[methodName] = stringProxyFn(methodName);
    });
    hasImplementedStringishMethods = true;
    return currentClass;
  }
}

module.exports = ((_FbtResultBase            )                      );

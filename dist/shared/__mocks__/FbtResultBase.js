"use strict";

/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * @format
 * @emails oncall+internationalization
 */
var MockedFbtResultBase = jest.fn();
var ActualFbtResultBase = jest.requireActual('FbtResultBase'); // Unmock this method because it needs to be used by FbtResultBase almost all the time

MockedFbtResultBase.usingStringProxyMethod = ActualFbtResultBase.usingStringProxyMethod;
module.exports = MockedFbtResultBase;
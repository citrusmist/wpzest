'use strict';

describe('Service: cmUtil', function () {

  // load the service's module
  beforeEach(module('wpZestApp'));

  // instantiate service
  var cmUtil;
  beforeEach(inject(function (_cmUtil_) {
    cmUtil = _cmUtil_;
  }));

  it('should do something', function () {
    expect(!!cmUtil).toBe(true);
  });

});

'use strict';

describe('Service: cmMqState', function () {

  // load the service's module
  beforeEach(module('wpZestApp'));

  // instantiate service
  var cmMqState;
  beforeEach(inject(function (_cmMqState_) {
    cmMqState = _cmMqState_;
  }));

  it('should do something', function () {
    expect(!!cmMqState).toBe(true);
  });

});

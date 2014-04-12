'use strict';

describe('Service: cmTransition', function () {

  // load the service's module
  beforeEach(module('wpZestApp'));

  // instantiate service
  var cmTransition;
  beforeEach(inject(function (_cmTransition_) {
    cmTransition = _cmTransition_;
  }));

  it('should do something', function () {
    expect(!!cmTransition).toBe(true);
  });

});

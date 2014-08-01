'use strict';

describe('Service: cmPage', function () {

  // load the service's module
  beforeEach(module('wpZestApp'));

  // instantiate service
  var cmPage;
  beforeEach(inject(function (_cmPage_) {
    cmPage = _cmPage_;
  }));

  it('should do something', function () {
    expect(!!cmPage).toBe(true);
  });

});

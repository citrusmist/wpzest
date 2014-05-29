'use strict';

describe('Service: projects/cmProjects', function () {

  // load the service's module
  beforeEach(module('wpZestApp'));

  // instantiate service
  var cmProjects;
  beforeEach(inject(function (_cmProjects_) {
    cmProjects = _cmProjects_;
  }));

  it('should do something', function () {
    expect(!!cmProjects).toBe(true);
  });

});

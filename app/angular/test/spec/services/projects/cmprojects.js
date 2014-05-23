'use strict';

describe('Service: projects/cmProjects', function () {

  // load the service's module
  beforeEach(module('wpZestApp'));

  // instantiate service
  var projects/cmProjects;
  beforeEach(inject(function (_projects/cmProjects_) {
    projects/cmProjects = _projects/cmProjects_;
  }));

  it('should do something', function () {
    expect(!!projects/cmProjects).toBe(true);
  });

});

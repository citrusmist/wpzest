'use strict';

describe('Controller: ProjectsProjectnameCtrl', function () {

  // load the controller's module
  beforeEach(module('wpZestApp'));

  var ProjectsProjectnameCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProjectsProjectnameCtrl = $controller('ProjectsProjectnameCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

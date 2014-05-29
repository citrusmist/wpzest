'use strict';

describe('Controller: ProjectsProjectCtrl', function () {

  // load the controller's module
  beforeEach(module('wpZestApp'));

  var ProjectsProjectCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {

    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('data/projects.json')
      .respond([{postName: 'amalgam-studios'}]);

    scope = $rootScope.$new();
    ProjectsProjectCtrl = $controller('ProjectsProjectCtrl', {
      $scope: scope
    });
  }));

  it('should attach a project to the scope', function () {
    expect(scope.project).toBeUndefined();
    $httpBackend.flush();


  });
});

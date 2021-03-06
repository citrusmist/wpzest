'use strict';

describe('Directive: projects/cmproject', function () {

  // load the directive's module
  beforeEach(module('wpZestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<projects/cmproject></projects/cmproject>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the projects/cmproject directive');
  }));
});

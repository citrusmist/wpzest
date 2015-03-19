'use strict';

describe('Directive: cmLogomark', function () {

  // load the directive's module
  beforeEach(module('wpZestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cm-logomark></cm-logomark>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the cmLogomark directive');
  }));
});

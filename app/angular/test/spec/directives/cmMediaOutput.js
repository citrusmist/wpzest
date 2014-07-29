'use strict';

describe('Directive: cmMediaOutput', function () {

  // load the directive's module
  beforeEach(module('wpZestApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cm-media-output></cm-media-output>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the cmMediaOutput directive');
  }));
});

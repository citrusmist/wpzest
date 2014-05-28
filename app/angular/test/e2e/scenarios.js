'use strict';

describe('wpZest App', function() {

  beforeEach(function() {
    browser().navigateTo('/');
  });

  describe('Homepage', function() {
    it('should render project specific links', function() {
    	var el   = element('.projects-link:first');
    	var href = element('.projects-link:first').attr('href');

			el.click();

      expect(browser().location().path()).toBe(href);
    });
  });

});
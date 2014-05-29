'use strict';

describe('wpZest App', function() {

  describe('Homepage', function() {

  	beforeEach(function() {
	    browser().navigateTo('/');
	  });

    it('should not redirect project link', function() {
    	var el   = element('.projects-link:first');
    	var href = element('.projects-link:first').attr('href');

			el.click();

      expect(browser().location().path()).toContain('/projects');
    });
  });

  describe('Project view', function() {

  	beforeEach(function() {
  		browser().navigateTo('/#/projects/amalgam-studios');
  	});

  	it('should display placeholder with project name', function() {
    	expect(binding('projectName')).toBe('amalgam-studios');
    });

    it('should display landing page when closed', function() {
    	var el   = element('.project-close');

    	el.click();

    	expect(browser().location().path()).toBe('/');
    });
  });

});
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
  		browser().navigateTo('/#/project/amalgam-studios');
  	});

  	it('should display placeholder with project name', function() {
    	expect(binding('project.postTitle')).toBe('Amalgam Studios');
    });

    it('should display landing page when closed', function() {

			var header = element('.header');
			var close  = element('.project-close');
    	close.click();

    	expect(browser().location().path()).toBe('/');
    	expect(header.attr('class')).not().toContain('header--isSecondary');
    });

    it('should display header in secondary state', function() {
    	var header = element('.header');
    	expect(header.attr('class')).toContain('header--isSecondary');
    });
  });

});
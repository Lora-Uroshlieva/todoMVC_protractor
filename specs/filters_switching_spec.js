'use strict';

const Application = require('./../src/pages/Application');
const app = new Application();
const preconditionClear = require('./../src/helpers/preconditionHelper');
const allTaskPage = app.allTaskPage;
const completedTaskPage = app.completedTaskPage;

describe('Switching from filter to filter', function () {
	beforeEach(function () {
		allTaskPage.get();
		preconditionClear();
		allTaskPage.addNewTask('Task 1');
	});

	afterEach(function () {
		preconditionClear();
	});

	it('should move to completed tasks page', function () {
		allTaskPage.completedLink.click();
		let url = browser.getCurrentUrl();
		expect(url).toEqual('http://todomvc.com/examples/angularjs/#/completed');
	});

	it('should move to active tasks page', function () {
		allTaskPage.completedLink.click();
		completedTaskPage.activeLink.click();
		let url = browser.getCurrentUrl();
		expect(url).toEqual('http://todomvc.com/examples/angularjs/#/active');
	});

	it('should move to all tasks page', function () {
		allTaskPage.completedLink.click();
		completedTaskPage.allLink.click();
		let url = browser.getCurrentUrl();
		expect(url).toEqual('http://todomvc.com/examples/angularjs/#/');
	});
});
'use strict';

const Application = require('./../src/pages/Application');
const app = new Application();
const preconditionClear = require('./../src/helpers/preconditionHelper');


describe('Additional edit operations', function () {
	beforeEach(function () {
		preconditionClear();
		app.allTaskPage.addNewTask('Task for editing');
	});

	it('should edit task with pressing enter after input', function () {
		app.allTaskPage.editTask('Task for editing', 'Edited task', 'enter');
		expect(app.allTaskPage.openedTask.getText()).toEqual('Edited task');
	});

	it('should edit task with clicking outside after input', function () {
		app.allTaskPage.editTask('Task for editing', 'Edited task', 'click');
		expect(app.allTaskPage.openedTask.getText()).toEqual('Edited task');
	});

	it('should edit task with pressing tab after input', function () {
		app.allTaskPage.editTask('Task for editing', 'Edited task', 'tab');
		expect(app.allTaskPage.openedTask.getText()).toEqual('Edited task');
	});

	it('should cancel edit by press escape', function () {
		browser.actions()
			.doubleClick(app.allTaskPage.findTaskContainerByText('Task for editing')
				.$('.view'))
			.perform();
		app.allTaskPage.editTaskField.clear().sendKeys('Task will not be edited!');
		app.allTaskPage.editTaskField.sendKeys(protractor.Key.ESCAPE);
		expect(app.allTaskPage.findTaskByText('Task for editing').getText()).toEqual('Task for editing');
	});


});
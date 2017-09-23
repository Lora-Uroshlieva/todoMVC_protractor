'use strict';

const Application = require('./../src/pages/Application');
const app = new Application();
const preconditionHelper = require('./../src/helpers/preconditionHelper');

describe('Page can manage tasks', function () {

	beforeEach(function () {
		app.completedTaskPage.get();
	});

	describe('Reopen', function () {
		beforeEach(function () {
			preconditionHelper();
			app.completedTaskPage.addNewTask('Task 1 for reopening');
			app.allTaskPage.get();
			app.allTaskPage.completeOneTask('Task 1 for reopening');
			app.completedTaskPage.get();
		});

		it('should reopen all task after clicking on checkbox', function () {
			app.completedTaskPage.undoTask('Task 1 for reopening');
			expect(app.completedTaskPage.countActiveTasks()).toEqual('1');
		});
	});

	describe('Reopen all', function () {
		beforeEach(function () {
			preconditionHelper();
			app.allTaskPage.addNewTask('Task 1 for completing');
			app.allTaskPage.addNewTask('Task 2 for completing');
			app.allTaskPage.markAllTasksDone();
		});

		it('should complete make all tasks as new after clicking on checkbox', function () {
			app.allTaskPage.markAllTasksUndone();
			expect(app.allTaskPage.countActiveTasks()).toEqual('2');
		});
	});

	describe('Delete', function () {
		beforeEach(function () {
			preconditionHelper();
			app.completedTaskPage.addNewTask('Task for deleting');
			app.completedTaskPage.addNewTask('Task to leave');
			app.allTaskPage.get();
			app.allTaskPage.completeOneTask('Task for deleting');
			app.completedTaskPage.get();
		});

		it('should delete task by clicking destroy button', function () {
			app.completedTaskPage.deleteOneTask('Task for deleting');
			expect(app.completedTaskPage.countActiveTasks()).toEqual('1');
		});
	});

	describe('Clear completed', function () {
		beforeEach(function () {
			preconditionHelper();
			app.completedTaskPage.addNewTask('Task for completing and deleting');
			app.completedTaskPage.addNewTask('Task to leave');
			app.allTaskPage.get();
			app.allTaskPage.completeOneTask('Task for completing and deleting');
			app.completedTaskPage.get();
		});

		it('should delete all completed tasks by pushing button', function () {
			app.completedTaskPage.clearCompletedTasks();
			expect(app.completedTaskPage.countActiveTasks()).toEqual('1');
		});
	});
});
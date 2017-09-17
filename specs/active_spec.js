"use strict";

const Application = require('./../src/pages/Application');
const app = new Application();
const preconditionHelper = require('./../src/helpers/preconditionHelper');

describe('Page can manage tasks', function () {

    beforeEach(function () {
        app.activeTaskPage.get();
    });

    describe('Add', function () {
        it('should add new task into list', function () {
            browser.sleep(6000);
            app.activeTaskPage.addNewTask('Task #1');
            browser.sleep(6000);
            let taskText = app.activeTaskPage.openedTask.getText();
            browser.sleep(6000);
            expect(taskText).toEqual('Task #1');
            expect(app.activeTaskPage.countActiveTasks()).toEqual('1');
        });
    });

    describe('Edit', function () {
        beforeEach(function () {
            preconditionHelper();
            app.activeTaskPage.addNewTask('Task for editing');
        });

        it('should edit task with clicking enter after input', function () {
            app.activeTaskPage.editTask('Task for editing', 'Edited task', 'enter');
            expect(app.activeTaskPage.openedTask.getText()).toEqual('Edited task');
        });

        it('should edit task with clicking outside after input', function () {
            app.activeTaskPage.editTask('Task for editing', 'Edited task', 'click');
            expect(app.activeTaskPage.openedTask.getText()).toEqual('Edited task');
        });

        it('should edit task with clicking tab after input', function () {
            app.activeTaskPage.editTask('Task for editing', 'Edited task', 'tab');
            expect(app.activeTaskPage.openedTask.getText()).toEqual('Edited task');
        });
    });

    describe('Complete', function () {
        beforeEach(function () {
            preconditionHelper();
            app.activeTaskPage.addNewTask('Task for completing')
        });

        it('should complete one task after clicking on checkbox', function () {
            app.activeTaskPage.completeOneTask('Task for completing');
            expect(app.activeTaskPage.countActiveTasks()).toEqual('0');
        });
    });

    describe('Complete all', function () {
        beforeEach(function () {
            preconditionHelper();
            app.activeTaskPage.addNewTask('Task 1 for completing');
            app.activeTaskPage.addNewTask('Task 2 for completing');
        });

        it('should complete all tasks after clicking on checkbox', function () {
            app.activeTaskPage.markAllTasksDone();
            expect(app.activeTaskPage.countActiveTasks()).toEqual('0');
        });
    });

    describe('Delete', function () {
        beforeEach(function () {
            preconditionHelper();
            app.activeTaskPage.addNewTask('Task for deleting');
            app.activeTaskPage.addNewTask('Task to leave');
        });

        it('should delete task by clicking destroy button', function () {
            app.activeTaskPage.deleteOneTask('Task for deleting');
            expect(app.activeTaskPage.countActiveTasks()).toEqual('1');
        });
    });

    describe('Clear completed', function () {
        beforeEach(function () {
            preconditionHelper();
            app.activeTaskPage.addNewTask('Task for completing and deleting');
            app.activeTaskPage.addNewTask('Task to leave');
            app.activeTaskPage.completeOneTask('Task for completing and deleting');
        });

        it('should delete all completed tasks by pushing button', function () {
            app.activeTaskPage.clearCompletedTasks();
            expect(app.activeTaskPage.countActiveTasks()).toEqual('1');
        });
    });
});
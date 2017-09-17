"use strict";

const Application = require('./../src/pages/Application');
const app = new Application();
const preconditionHelper = require('./../src/helpers/preconditionHelper');

describe('Page can manage tasks', function () {

    beforeEach(function () {
        app.allTaskPage.get();
    });

    describe('Add', function () {
        it('should add new task into list', function () {
            app.allTaskPage.addNewTask('Task #1');
            let taskText = app.allTaskPage.openedTask.getText();
            expect(taskText).toEqual('Task #1');
            expect(app.allTaskPage.countActiveTasks()).toEqual('1');
        });
    });

    describe('Edit', function () {
        beforeEach(function () {
            preconditionHelper();
            app.allTaskPage.addNewTask('Task for editing');
        });

        it('should edit task with clicking enter after input', function () {
            app.allTaskPage.editTask('Task for editing', 'Edited task', 'enter');
            expect(app.allTaskPage.openedTask.getText()).toEqual('Edited task');
        });

        it('should edit task with clicking outside after input', function () {
            app.allTaskPage.editTask('Task for editing', 'Edited task', 'click');
            expect(app.allTaskPage.openedTask.getText()).toEqual('Edited task');
        });

        it('should edit task with clicking tab after input', function () {
            app.allTaskPage.editTask('Task for editing', 'Edited task', 'tab');
            expect(app.allTaskPage.openedTask.getText()).toEqual('Edited task');
        });
    });

    describe('Complete', function () {
        beforeEach(function () {
            preconditionHelper();
            app.allTaskPage.addNewTask('Task for completing')
        });

        it('should complete one task after clicking on checkbox', function () {
            app.allTaskPage.completeOneTask('Task for completing');
            expect(app.allTaskPage.countCompletedTasks()).toEqual(1);
        });
    });
    
    describe('Complete all', function () {
        beforeEach(function () {
            preconditionHelper();
            app.allTaskPage.addNewTask('Task 1 for completing');
            app.allTaskPage.addNewTask('Task 2 for completing');
        });
        
        it('should complete all tasks after clicking on checkbox', function () {
            app.allTaskPage.markAllTasksDone();
            expect(app.allTaskPage.countCompletedTasks()).toEqual(2);
        });
    });

    describe('Uncomplete all', function () {
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

    describe('Reopen', function () {
        beforeEach(function () {
            preconditionHelper();
            app.allTaskPage.addNewTask('Task 1 for reopening');
            app.allTaskPage.completeOneTask('Task 1 for reopening');
        });

        it('should reopen task after clicking on checkbox', function () {
            app.allTaskPage.undoTask('Task 1 for reopening');
            expect(app.allTaskPage.countActiveTasks()).toEqual('1');
        });
    });

    describe('Delete', function () {
        beforeEach(function () {
            preconditionHelper();
            app.allTaskPage.addNewTask('Task for deleting');
            app.allTaskPage.addNewTask('Task to leave');
        });

        it('should delete task by clicking destroy button', function () {
            app.allTaskPage.deleteOneTask('Task for deleting');
            expect(app.allTaskPage.countActiveTasks()).toEqual('1');
        });
    });
    
    describe('Clear completed', function () {
        beforeEach(function () {
            preconditionHelper();
            app.allTaskPage.addNewTask('Task for completing and deleting');
            app.allTaskPage.addNewTask('Task to leave');
            app.allTaskPage.completeOneTask('Task for completing and deleting');
        });

        it('should delete all completed tasks by pushing button', function () {
            app.allTaskPage.clearCompletedTasks();
            expect(app.allTaskPage.countActiveTasks()).toEqual('1');
        });
    });
});
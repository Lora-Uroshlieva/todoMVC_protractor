"use strict";

const Application = require('./../src/pages/Application');
const app = new Application();
const preconditionHelper = require('./../src/helpers/preconditionHelper');
const Task = require('./../src/models/Task');
const newTask = new Task('This is new task', false);
const completedTask = new Task('This is completed task', true);

describe('Active task page can manage tasks', function () {

    beforeEach(function () {
        app.activeTaskPage.get();
        preconditionHelper.clearTasks();
    });

    describe('Add', function () {
        it('should add new task into list', function () {
            app.activeTaskPage.addNewTask('Task #1');
            let taskText = app.activeTaskPage.openedTask.getText();
            expect(taskText).toEqual('Task #1');
            expect(app.activeTaskPage.countActiveTasks()).toEqual('1');
        });
    });

    describe('Edit', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createNewTask(newTask);
        });

        it('should edit task with clicking enter after input', function () {
            app.activeTaskPage.editTask('This is new task', 'Edited task', 'enter');
            expect(app.activeTaskPage.openedTask.getText()).toEqual('Edited task');
        });
       it('should edit task with clicking outside after input', function () {
            app.activeTaskPage.editTask('This is new task', 'Edited task', 'click');
            expect(app.activeTaskPage.openedTask.getText()).toEqual('Edited task');
        });

        it('should edit task with clicking tab after input', function () {
            app.activeTaskPage.editTask('This is new task', 'Edited task', 'tab');
            expect(app.activeTaskPage.openedTask.getText()).toEqual('Edited task');
        });
    });

    describe('Complete', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createNewTask(newTask);
        });

        it('should complete one task after clicking on checkbox', function () {
            app.activeTaskPage.completeOneTask('This is new task');
            expect(app.activeTaskPage.countActiveTasks()).toEqual('0');
        });
    });

    describe('Complete all', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createSomeTasks(newTask, newTask);
        });

        it('should complete all tasks after clicking on checkbox', function () {
            app.activeTaskPage.markAllTasksDone();
            expect(app.activeTaskPage.countActiveTasks()).toEqual('0');
        });
    });

    describe('Delete', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createSomeTasks(newTask, newTask);

        });

        it('should delete task by clicking destroy button', function () {
            app.activeTaskPage.deleteOneTask('This is new task');
            expect(app.activeTaskPage.countActiveTasks()).toEqual('1');
        });
    });

    describe('Clear completed', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createSomeTasks(newTask, completedTask);

        });

        it('should delete all completed tasks by pushing button', function () {
            app.activeTaskPage.clearCompletedTasks();
            expect(app.activeTaskPage.countActiveTasks()).toEqual('1');
        });
    });
});
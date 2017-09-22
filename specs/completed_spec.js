"use strict";

const Application = require('./../src/pages/Application');
const app = new Application();
const preconditionHelper = require('./../src/helpers/preconditionHelper');
const Task = require('./../src/models/Task');
const newTask = new Task('This is new task', false);
const completedTask = new Task('This is completed task', true);

describe('Completed task page can manage tasks', function () {

    beforeEach(function () {
        app.completedTaskPage.get();
    });

    describe('Reopen', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createNewTask(completedTask);
        });

        it('should reopen all task after clicking on checkbox', function () {
            app.completedTaskPage.section.undoTask('This is completed task');
            expect(app.completedTaskPage.footer.countActiveTasks()).toEqual('1');
        });
    });

    describe('Reopen all', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createSomeTasks(completedTask, completedTask);
        });

        it('should complete make all tasks as new after clicking on checkbox', function () {
            app.allTaskPage.section.markAllTasksUndone();
            expect(app.allTaskPage.footer.countActiveTasks()).toEqual('2');
        });
    });

    describe('Delete', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createSomeTasks(newTask, completedTask);
        });

        it('should delete task by clicking destroy button', function () {
            app.completedTaskPage.section.deleteOneTask('This is completed task');
            expect(app.completedTaskPage.footer.countActiveTasks()).toEqual('1');
        });
    });

    describe('Clear completed', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createSomeTasks(newTask, completedTask);
        });

        it('should delete all completed tasks by pushing button', function () {
            app.completedTaskPage.footer.clearCompletedTasks();
            expect(app.completedTaskPage.footer.countActiveTasks()).toEqual('1');
        });
    });
});
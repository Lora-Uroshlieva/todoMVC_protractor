"use strict";

const Application = require('./../src/pages/Application');
const app = new Application();
const preconditionHelper = require('./../src/helpers/preconditionHelper');
const Task = require('./../src/models/Task');
const newTask = new Task('This is new task', false);
const completedTask = new Task('This is completed task', true);

describe('AllTask page can manage tasks', function () {

    beforeEach(function () {
        app.allTaskPage.get();
        preconditionHelper.clearTasks();
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
            preconditionHelper.clearTasks();
            preconditionHelper.createNewTask(newTask);
        });

        it('should edit task with clicking enter after input', function () {
            app.allTaskPage.editTask('This is new task', 'Edited task', 'enter');
            expect(app.allTaskPage.openedTask.getText()).toEqual('Edited task');
        });

        it('should edit task with clicking outside after input', function () {
            app.allTaskPage.editTask('This is new task', 'Edited task', 'click');
            expect(app.allTaskPage.openedTask.getText()).toEqual('Edited task');
        });

        it('should edit task with clicking tab after input', function () {
            app.allTaskPage.editTask('This is new task', 'Edited task', 'tab');
            expect(app.allTaskPage.openedTask.getText()).toEqual('Edited task');
        });
    });

    describe('Complete', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createNewTask(newTask);
        });

        it('should complete one task after clicking on checkbox', function () {
            app.allTaskPage.completeOneTask('This is new task');
            expect(app.allTaskPage.countCompletedTasks()).toEqual(1);
        });
    });
    
    describe('Complete all', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createSomeTasks(newTask, newTask);
        });
        
        it('should complete all tasks after clicking on checkbox', function () {
            app.allTaskPage.markAllTasksDone();
            expect(app.allTaskPage.countCompletedTasks()).toEqual(2);
        });
    });

    describe('Reopen all', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createSomeTasks(completedTask, completedTask);
        });

        it('should make all tasks new after clicking on checkbox', function () {
            app.allTaskPage.markAllTasksUndone();
            expect(app.allTaskPage.countActiveTasks()).toEqual('2');
        });
    });

    describe('Reopen', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createNewTask(completedTask);
        });

        it('should reopen task after clicking on checkbox', function () {
            app.allTaskPage.undoTask('This is completed task');
            expect(app.allTaskPage.countActiveTasks()).toEqual('1');
        });
    });

    describe('Delete', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createSomeTasks(newTask, newTask);
        });

        it('should delete task by clicking destroy button', function () {
            app.allTaskPage.deleteOneTask('This is new task');
            expect(app.allTaskPage.countActiveTasks()).toEqual('1');
        });
    });
    
    describe('Clear completed', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createSomeTasks(newTask, completedTask);
        });

        it('should delete all completed tasks by pushing button', function () {
            app.allTaskPage.clearCompletedTasks();
            expect(app.allTaskPage.countActiveTasks()).toEqual('1');
        });
    });
});
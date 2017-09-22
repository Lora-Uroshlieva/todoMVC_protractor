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
            app.allTaskPage.header.addNewTask('Task #1');
            let taskText = app.allTaskPage.section.openedTask.getText();
            expect(taskText).toEqual('Task #1');
            expect(app.allTaskPage.footer.countActiveTasks()).toEqual('1');
        });
    });

    describe('Edit', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createNewTask(newTask);
        });

        it('should edit task with clicking enter after input', function () {
            app.allTaskPage.section.editTask('This is new task', 'Edited task', 'enter');
            expect(app.allTaskPage.section.openedTask.getText()).toEqual('Edited task');
        });

        it('should edit task with clicking outside after input', function () {
            app.allTaskPage.section.editTask('This is new task', 'Edited task', 'click');
            expect(app.allTaskPage.section.openedTask.getText()).toEqual('Edited task');
        });

        it('should edit task with clicking tab after input', function () {
            app.allTaskPage.section.editTask('This is new task', 'Edited task', 'tab');
            expect(app.allTaskPage.section.openedTask.getText()).toEqual('Edited task');
        });
    });

    describe('Complete', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createNewTask(newTask);
        });

        it('should complete one task after clicking on checkbox', function () {
            app.allTaskPage.section.completeOneTask('This is new task');
            expect(app.allTaskPage.section.countCompletedTasks()).toEqual(1);
        });
    });
    
    describe('Complete all', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createSomeTasks(newTask, newTask);
        });
        
        it('should complete all tasks after clicking on checkbox', function () {
            app.allTaskPage.section.markAllTasksDone();
            expect(app.allTaskPage.section.countCompletedTasks()).toEqual(2);
        });
    });

    describe('Reopen all', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createSomeTasks(completedTask, completedTask);
        });

        it('should make all tasks new after clicking on checkbox', function () {
            app.allTaskPage.section.markAllTasksUndone();
            expect(app.allTaskPage.footer.countActiveTasks()).toEqual('2');
        });
    });

    describe('Reopen', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createNewTask(completedTask);
        });

        it('should reopen task after clicking on checkbox', function () {
            app.allTaskPage.section.undoTask('This is completed task');
            expect(app.allTaskPage.footer.countActiveTasks()).toEqual('1');
        });
    });

    describe('Delete', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createSomeTasks(newTask, newTask);
        });

        it('should delete task by clicking destroy button', function () {
            app.allTaskPage.section.deleteOneTask('This is new task');
            expect(app.allTaskPage.footer.countActiveTasks()).toEqual('1');
        });
    });
    
    describe('Clear completed', function () {
        beforeEach(function () {
            preconditionHelper.clearTasks();
            preconditionHelper.createSomeTasks(newTask, completedTask);
        });

        it('should delete all completed tasks by pushing button', function () {
            app.allTaskPage.footer.clearCompletedTasks();
            expect(app.allTaskPage.footer.countActiveTasks()).toEqual('1');
        });
    });
});
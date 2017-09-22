"use strict";

const Application = require('./../src/pages/Application');
const app = new Application();
const preconditionHelper = require('./../src/helpers/preconditionHelper');
const Task = require('./../src/models/Task');
const newTask = new Task('This is new task', false);
const completedTask = new Task('This is completed task', true);


describe('Additional edit operations', function () {
    beforeEach(function () {
        preconditionHelper.clearTasks();
        preconditionHelper.createNewTask(newTask);
    });

    it('should edit task with pressing enter after input', function () {
        app.allTaskPage.section.editTask('This is new task', 'Edited task', 'enter');
        expect(app.allTaskPage.section.openedTask.getText()).toEqual('Edited task');
    });

    it('should edit task with clicking outside after input', function () {
        app.allTaskPage.section.editTask('This is new task', 'Edited task', 'click');
        expect(app.allTaskPage.section.openedTask.getText()).toEqual('Edited task');
    });

    it('should edit task with pressing tab after input', function () {
        app.allTaskPage.section.editTask('This is new task', 'Edited task', 'tab');
        expect(app.allTaskPage.section.openedTask.getText()).toEqual('Edited task');
    });

    it('should cancel edit by press escape', function () {
        browser.actions()
            .doubleClick(app.allTaskPage.section.findTaskContainerByText('This is new task')
            .$('.view'))
            .perform();
        app.allTaskPage.section.editTaskField.clear().sendKeys('Task will not be edited!');
        app.allTaskPage.section.editTaskField.sendKeys(protractor.Key.ESCAPE);
        expect(app.allTaskPage.section.findTaskByText('This is new task').getText()).toEqual('This is new task');
    });


});
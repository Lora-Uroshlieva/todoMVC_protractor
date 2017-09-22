"use strict";

const Application = require('./../src/pages/Application');
const app = new Application();
const preconditionHelper = require('./../src/helpers/preconditionHelper');
const allTaskPage = app.allTaskPage;
const activeTaskPage = app.activeTaskPage;
const completedTaskPage = app.completedTaskPage;
const Task = require('./../src/models/Task');
const newTask = new Task('This is new task', false);

describe('Switching from filter to filter', function () {
    beforeEach(function () {
        allTaskPage.get();
        preconditionHelper.clearTasks();
        preconditionHelper.createNewTask(newTask);
    });

    afterEach(function () {
        preconditionHelper.clearTasks();
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
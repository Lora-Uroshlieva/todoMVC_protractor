"use strict";

const Application = require('./../src/pages/Application');
const app = new Application();
const preconditionClear = require('./../src/helpers/preconditionHelper');


describe('Check process of adding new tasks and editing', function () {
    const allTaskPage = app.allTaskPage;
    const completedTaskPage = app.completedTaskPage;
    const activeTaskPage = app.activeTaskPage;
    it('should add new task to list, mark as done, mark as undone, delete', function () {

        //open page and add 1 task by clicking enter
        allTaskPage.get();
        preconditionClear();
        allTaskPage.addNewTask('Task 1');
        allTaskPage.addNewTask('');
        expect(allTaskPage.countActiveTasks()).toEqual('1');

        //Mark task as done:
        allTaskPage.completeOneTask('Task 1');
        expect(allTaskPage.countCompletedTasks()).toEqual(1);

        //Move to page "active" and check that no tasks in list.
        activeTaskPage.get();
        expect(activeTaskPage.tasks.count()).toEqual(0);

        //Move to page "Completed" and check 1 task in list:
        completedTaskPage.get();
        expect(completedTaskPage.tasks.count()).toEqual(1);

        //Edit task by clicking enter:
        completedTaskPage.editTask('Task 1', 'This task was edited once.', 'enter');
        expect(completedTaskPage.findTaskByText('This task was edited once.').getText())
            .toEqual('This task was edited once.');

        // //Edit task by clicking out of text field
        completedTaskPage.editTask('This task was edited once.', 'This task was edited twice.', 'click');
        expect(completedTaskPage.findTaskByText('This task was edited twice.').getText())
            .toEqual('This task was edited twice.');

        // Check task as undone
        completedTaskPage.undoTask('This task was edited' +
            ' twice.');
        expect(completedTaskPage.tasks.count()).toEqual(0);
        expect(completedTaskPage.countActiveTasks()).toEqual('1');

        //move to link active. 1 task in list:
        activeTaskPage.get();
        expect(activeTaskPage.tasks.count()).toEqual(1);

        //edit active task by pressing enter
        activeTaskPage.editTask('This task was edited twice.', 'Edited 3 times', 'enter');
        expect(activeTaskPage.findTaskByText('Edited 3 times').getText())
            .toEqual('Edited 3 times');

        //edit active task by clicking outside the field
        activeTaskPage.editTask('Edited 3 times', 'Edited 4 times', 'click');
        expect(activeTaskPage.findTaskByText('Edited 4 times').getText())
            .toEqual('Edited 4 times');

        //add one more item to the list:
        activeTaskPage.addNewTask('Task 2');
        expect(activeTaskPage.tasks.count()).toEqual(2);

        //mark all items in list as done:
        activeTaskPage.markAllTasksDone();
        expect(activeTaskPage.countCompletedTasks()).toEqual(0);

        //move to page "Completed", check that completed items are in list.
        completedTaskPage.get();
        expect(activeTaskPage.countCompletedTasks()).toEqual(2);

        //reopen all items
        completedTaskPage.markAllTasksUndone();
        expect(completedTaskPage.countCompletedTasks()).toEqual(0);

        //move to page All, check active items are visible.
        allTaskPage.get();
        expect(allTaskPage.countActiveTasks()).toEqual('2');

        //add new items, check deleting function:
        allTaskPage.addNewTask('Task 3');
        allTaskPage.addNewTask('Task 4');
        expect(allTaskPage.countActiveTasks()).toEqual('4');
        allTaskPage.deleteOneTask('Edited 4 times');
        expect(allTaskPage.countActiveTasks()).toEqual('3');

        //clear completed items by button
        allTaskPage.completeOneTask('Task 2');
        allTaskPage.clearCompletedTasks();
        expect(allTaskPage.countActiveTasks()).toEqual('2');

        //chose all items and click on button to clear all completed items.
        allTaskPage.markAllTasksDone();
        allTaskPage.clearCompletedTasks();
        expect(allTaskPage.countActiveTasks()).toEqual('');

    });
});

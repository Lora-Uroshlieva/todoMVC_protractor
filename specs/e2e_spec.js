"use strict";

const Application = require('./../src/pages/Application');
const app = new Application();
const preconditionHelper = require('./../src/helpers/preconditionHelper');


describe('Check process of adding new tasks and editing', function () {
    const allTaskPage = app.allTaskPage;
    const completedTaskPage = app.completedTaskPage;
    const activeTaskPage = app.activeTaskPage;
    it('should add new task to list, mark as done, mark as undone, delete', function () {

        //open page and add 1 task by clicking enter
        allTaskPage.get();
        preconditionHelper.clearTasks();
        allTaskPage.header.addNewTask('Task 1');
        allTaskPage.header.addNewTask('');
        expect(allTaskPage.footer.countActiveTasks()).toEqual('1');

        //Mark task as done:
        allTaskPage.section.completeOneTask('Task 1');
        expect(allTaskPage.section.countCompletedTasks()).toEqual(1);

        //Move to page "active" and check that no tasks in list.
        activeTaskPage.get();
        expect(activeTaskPage.section.tasks.count()).toEqual(0);

        //Move to page "Completed" and check 1 task in list:
        completedTaskPage.get();
        expect(completedTaskPage.section.tasks.count()).toEqual(1);

        //Edit task by clicking enter:
        completedTaskPage.section.editTask('Task 1', 'This task was edited once.', 'enter');
        expect(completedTaskPage.section.findTaskByText('This task was edited once.').getText())
            .toEqual('This task was edited once.');

        // //Edit task by clicking out of text field
        completedTaskPage.section.editTask('This task was edited once.', 'This task was edited twice.', 'click');
        expect(completedTaskPage.section.findTaskByText('This task was edited twice.').getText())
            .toEqual('This task was edited twice.');

        // Check task as undone
        completedTaskPage.section.undoTask('This task was edited' +
            ' twice.');
        expect(completedTaskPage.section.tasks.count()).toEqual(0);
        expect(completedTaskPage.footer.countActiveTasks()).toEqual('1');

        //move to link active. 1 task in list:
        activeTaskPage.get();
        expect(activeTaskPage.section.tasks.count()).toEqual(1);

        //edit active task by pressing enter
        activeTaskPage.section.editTask('This task was edited twice.', 'Edited 3 times', 'enter');
        expect(activeTaskPage.section.findTaskByText('Edited 3 times').getText())
            .toEqual('Edited 3 times');

        //edit active task by clicking outside the field
        activeTaskPage.section.editTask('Edited 3 times', 'Edited 4 times', 'click');
        expect(activeTaskPage.section.findTaskByText('Edited 4 times').getText())
            .toEqual('Edited 4 times');

        //add one more item to the list:
        activeTaskPage.header.addNewTask('Task 2');
        expect(activeTaskPage.section.tasks.count()).toEqual(2);

        //mark all items in list as done:
        activeTaskPage.section.markAllTasksDone();
        expect(activeTaskPage.section.countCompletedTasks()).toEqual(0);

        //move to page "Completed", check that completed items are in list.
        completedTaskPage.get();
        expect(activeTaskPage.section.countCompletedTasks()).toEqual(2);

        //reopen all items
        completedTaskPage.section.markAllTasksUndone();
        expect(completedTaskPage.section.countCompletedTasks()).toEqual(0);

        //move to page All, check active items are visible.
        allTaskPage.get();
        expect(allTaskPage.footer.countActiveTasks()).toEqual('2');

        //add new items, check deleting function:
        allTaskPage.header.addNewTask('Task 3');
        allTaskPage.header.addNewTask('Task 4');
        expect(allTaskPage.footer.countActiveTasks()).toEqual('4');
        allTaskPage.section.deleteOneTask('Edited 4 times');
        expect(allTaskPage.footer.countActiveTasks()).toEqual('3');

        //clear completed items by button
        allTaskPage.section.completeOneTask('Task 2');
        allTaskPage.footer.clearCompletedTasks();
        expect(allTaskPage.footer.countActiveTasks()).toEqual('2');

        //chose all items and click on button to clear all completed items.
        allTaskPage.section.markAllTasksDone();
        allTaskPage.footer.clearCompletedTasks();
        expect(allTaskPage.footer.countActiveTasks()).toEqual('');

    });
});

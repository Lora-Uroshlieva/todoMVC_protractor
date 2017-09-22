"use strict";


function clearTasks() {
    browser.executeScript('localStorage.removeItem("todos-angularjs");');
    browser.refresh();
}

function createNewTask(task) {
    // browser.sleep(25000);
    browser.executeScript(`localStorage.setItem('todos-angularjs','[${task.toString()}]');`);
    browser.refresh();
}

function createSomeTasks(...tasks) {
    let text = '';
    for (let task of arguments) {
        text += task.toString();
        text += ',';
    }
    text = text.slice(0, -1);
    browser.executeScript(`localStorage.setItem('todos-angularjs','[${text}]');`);
    browser.refresh();
}

module.exports = {clearTasks, createNewTask, createSomeTasks};
"use strict";

function clearTasks() {
    browser.executeScript('localStorage.removeItem("todos-angularjs");');
    browser.refresh();
}

module.exports = clearTasks;
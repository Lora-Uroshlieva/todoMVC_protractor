"use strict";

function clearTasks() {
    browser.executeScript('localStorage.removeItem("todos-angularjs");');
}

module.exports = clearTasks;
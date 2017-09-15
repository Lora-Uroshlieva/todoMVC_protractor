"use strict";

const AllTaskPage = require('./AllTaskPage');
const ActiveTaskPage = require('./ActiveTaskPage');
const CompletedTaskPage = require('./CompletedTaskPage');

class Application {
    constructor() {
        this.allTaskPage = new AllTaskPage();
        this.activeTaskPage = new ActiveTaskPage();
        this.completedTaskPage = new CompletedTaskPage();
    }
}

module.exports = Application;
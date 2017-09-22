"use strict";

class HeaderModule {
    constructor() {
        this.inputField = $('#new-todo');
    }

    addNewTask(text) {
        this.inputField.sendKeys(text).sendKeys(protractor.Key.ENTER);
    }

}

module.exports = HeaderModule;
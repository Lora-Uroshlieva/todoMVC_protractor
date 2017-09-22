"use strict";

class FooterModule {

    constructor(locator){
        this.activeTaskCounter = $('strong.ng-binding');
        this.allLink = $('a[href="#/"]');
        this.activeLink = $('a[href="#/active"]');
        this.completedLink = $('a[href="#/completed"]');
        this.clearCompletedButton = $('#clear-completed');
    }

    countActiveTasks() {
        return this.activeTaskCounter.getText();
    }

    clearCompletedTasks() {
        this.clearCompletedButton.click();
    }

}

module.exports = FooterModule;

"use strict";

class BasePage {
    constructor() {
        this.waitTimeout = 5000;
        global.BROWSER_TIMEOUT = 5000;
    }
}

module.exports = BasePage;
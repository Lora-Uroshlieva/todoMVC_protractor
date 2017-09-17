"use strict";

const BasePage = require('./BasePage');

class CompletedTaskPage extends BasePage {
    constructor() {
        super();
    }

    get() {
        browser.get(browser.baseUrl + '/completed');
    }
}

module.exports = CompletedTaskPage;
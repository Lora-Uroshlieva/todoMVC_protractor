"use strict";

const BasePage = require('./BasePage');

class ActiveTaskPage extends BasePage {
    constructor() {
        super();
    }

    get() {
        browser.get(browser.baseUrl + '/active');
    }
}

module.exports = ActiveTaskPage;
"use strict";

const BasePage = require('./BasePage');

class AllTaskPage extends BasePage {
    constructor() {
        super();
    }

    get() {
        browser.get(browser.baseUrl + '');
    }

}

module.exports = AllTaskPage;
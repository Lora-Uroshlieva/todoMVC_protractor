"use strict";

const HeaderModule = require('./modules/HeaderModule');
const SectionModule = require('./modules/SectionModule');
const FooterModule = require('./modules/FooterModule');

class BasePage {
    constructor() {
        this.waitTimeout = 5000;
        global.BROWSER_TIMEOUT = 5000;
        this.header = new HeaderModule();
        this.section = new SectionModule();
        this.footer = new FooterModule();
    }
}

module.exports = BasePage;
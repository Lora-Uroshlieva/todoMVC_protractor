exports.config = {
    baseUrl: 'http://todomvc.com/examples/angularjs/#/',
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./specs/*_spec.js'],
    capabilities: {
        'browserName': 'chrome'
    },

    onPrepare: function () {
        beforeEach(function () {
            browser.get('');
        });

        afterEach(function () {
            browser.manage().deleteAllCookies();
        });
    }
}
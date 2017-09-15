"use strict";

describe('Should add tasks', function () {
    it('Should open base page', function () {
        let url = browser.getCurrentUrl();
        expect(url).toEqual('http://todomvc.com/examples/angularjs/#/');
    });

    it('should create new task', function () {
        let input = element(by.model('newTodo'));
        input.sendKeys('Task 1').sendKeys(protractor.Key.ENTER);
        let counter = element(by.css('strong.ng-binding')).getText();
        expect(counter).toEqual('1');
    });
});
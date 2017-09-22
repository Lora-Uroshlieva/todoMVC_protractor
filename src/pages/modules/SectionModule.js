"use strict";

class SectionModule {
    constructor() {
        this.editTaskField = $('.editing form .edit');
        this.markAllButton = $('#toggle-all');
        this.openedTask = $('label.ng-binding');
        this.openedTasks = $$('label.ng-binding');
        this.destroyButton = 'button.destroy';
        this.completedTask = $('li.completed label.ng-binding');
        this.completedTasks = $$('li.completed label.ng-binding');
        this.tasks = $$('#main label.ng-binding');
    }

    markAllTasksDone() {
        this.markAllButton.click();
    }

    markAllTasksUndone() {
        this.markAllButton.click();
    }

    countCompletedTasks() {
        return this.completedTasks.count();
    }

    findTaskContainerByText(text) {
        return element(by.cssContainingText('li.ng-scope', text));
    }

    findTaskByText(text) {
        return this.findTaskContainerByText(text).$('label');
    }

    editTask(text, targetTaskText, method='click') {
        browser.actions()
            .doubleClick(this.findTaskContainerByText(text)
                .$('.view'))
            .perform();
        this.editTaskField.clear().sendKeys(targetTaskText);

        switch (method) {
            case 'click':
                $('.learn').click();
                break;
            case 'tab':
                this.editTaskField.sendKeys(protractor.Key.TAB);
                break;
            case 'enter':
                this.editTaskField.sendKeys(protractor.Key.ENTER);
                break;
            default:
                throw new Error('Method should be "enter" or "click" or "tab"');
        }
    }

    completeOneTask(taskText) {
        this.findTaskContainerByText(taskText)
            .$('input[type="checkbox"]').click();
    }

    undoTask(taskText) {
        this.findTaskContainerByText(taskText)
            .$('input[type="checkbox"]').click();
    }

    deleteOneTask(taskText) {
        this.findTaskContainerByText(taskText).click();
        this.findTaskContainerByText(taskText).$(this.destroyButton).click();
    }
}

module.exports = SectionModule;
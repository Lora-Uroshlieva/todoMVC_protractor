'use strict';

class BasePage {
	constructor() {
		this.waitTimeout = 5000;
		global.BROWSER_TIMEOUT = 5000;

		this.inputField = $('#new-todo');
		this.editTaskField = $('.editing form .edit');
		this.markAllButton = $('#toggle-all');
		this.openedTask = $('label.ng-binding');
		this.openedTasks = $$('label.ng-binding');
		this.destroyButton = 'button.destroy';
		this.completedTask = $('li.completed label.ng-binding');
		this.completedTasks = $$('li.completed label.ng-binding');
		this.tasks = $$('#main label.ng-binding');
		this.markTaskDone = element(by.model('todo.completed'));
		this.markTaskUndone = $('li.ng-scope.completed input');
		this.activeTaskCounter = $('strong.ng-binding');
		this.allLink = $('a[href="#/"]');
		this.activeLink = $('a[href="#/active"]');
		this.completedLink = $('a[href="#/completed"]');
		this.clearCompletedButton = $('#clear-completed');
	}

	addNewTask(text) {
		this.inputField.sendKeys(text).sendKeys(protractor.Key.ENTER);
	}

	markAllTasksDone() {
		this.markAllButton.click();
	}

	markAllTasksUndone() {
		this.markAllButton.click();
	}

	countActiveTasks() {
		return this.activeTaskCounter.getText();
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
			$('body').click();
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

	clearCompletedTasks() {
		this.clearCompletedButton.click();
	}
}

module.exports = BasePage;
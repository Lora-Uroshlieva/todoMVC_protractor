"use strict";

class Task {
    constructor(text, isCompleted) {
        this._text = text;
        this._isCompleted = isCompleted;
    }
}

module.exports = Task;
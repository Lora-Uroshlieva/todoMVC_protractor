"use strict";

class Task {
    constructor(text, isCompleted) {
        this._text = text;
        this._isCompleted = isCompleted;
    }

    toString() {
        return '{"title":"' + this._text + '","completed":' + this._isCompleted + '}';
    }
}

module.exports = Task;
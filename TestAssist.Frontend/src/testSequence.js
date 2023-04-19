export class TestSequence {

    _steps;

    constructor(steps) {
        this._steps = steps;
    }

    execute(context) {
        this._steps.forEach(step => step.execute(context));
    }
}
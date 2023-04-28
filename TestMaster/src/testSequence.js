export class TestSequence {

    _steps;

    constructor(steps) {
        this._steps = steps;
    }

    async execute(context, reporter) {
        for (let step of this._steps)
            await step.execute(context, reporter);
    }
}
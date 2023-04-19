export class TestSequence {

    _steps;

    constructor(steps) {
        this._steps = steps;
    }

    async execute(context) {
        for (let step of this._steps)
            await step.execute(context);
    }
}
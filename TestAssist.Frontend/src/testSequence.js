import {TestSequenceStep} from "./testSequenceStep";

export class TestSequence {

    _steps;

    constructor(node) {
        this._steps = [];
        node.querySelectorAll('p[tm-call]').forEach(n => this.createStep(n));
    }

    createStep(node) {
        this._steps.push(this.createStepInstance(node));
    }

    execute(context) {
        this._steps.forEach(step => step.execute(context));
    }

    createStepInstance(node) {
        return new TestSequenceStep(node);
    }
}
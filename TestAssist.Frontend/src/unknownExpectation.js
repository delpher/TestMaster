import {TestSequenceStep} from "./testSequenceStep";

export class UnknownExpectation extends TestSequenceStep {
    constructor(node) {
        super(node);
    }

    execute(context) {
        console.error('Expectation syntax can not be recognized.', this._node);
    }
}
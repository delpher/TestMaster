import {TestSequenceStep} from "./testSequenceStep";

export class TestListExpectation extends TestSequenceStep {

    _expectedValues;

    constructor(node) {
        super(node);
        this._expectedValues = [];
        node.querySelectorAll('li').forEach(n => this._expectedValues.push(n.innerText));
    }

    handleResult(invocationResult) {
        if (invocationResult.length !== this._expectedValues.length)
            throw new Error(`Assert Failed: expected ${this._expectedValues.length} elements but found ${invocationResult.length}`);
        return true;
    }
}
import {TestSequenceStep} from "../testSequenceStep";

export class TestListExpectation extends TestSequenceStep {

    _expectedValues;

    constructor(node) {
        super(node);
        this._expectedValues = [];
        node.querySelectorAll('li').forEach(n => this._expectedValues.push(n.innerText));
    }

    handleResult(invocationResult) {
        throw new Error("List assertion is not implemented");
    }
}
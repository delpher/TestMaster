import {TestSequenceStep} from "../testSequenceStep";

export class UnknownExpectation extends TestSequenceStep {
    constructor(methodName, methodArguments, view) {
        super(methodName, methodArguments, view);
    }
    execute() {
        throw new Error('Expectation syntax can not be recognized.');
    }
}
import {TestSequenceStep} from "../testSequenceStep";

export class TestExpectation extends TestSequenceStep {
    _assertions;
    
    constructor(methodName, methodArguments, assertions, view) {
        super(methodName, methodArguments, view);
        this._assertions = assertions;
    }
    
    handleResult(invocationResult) {
        this._assertions.forEach(assertion => assertion.execute(invocationResult));
    }
}
import {TestSequenceStep} from "../testSequenceStep";

export class TestExpectation extends TestSequenceStep {
    _assertions;
    
    constructor(endpointInvocator, assertions, view) {
        super(endpointInvocator, view);
        this._assertions = assertions;
    }
    
    handleResult(invocationResult) {
        this._assertions.forEach(assertion => assertion.execute(invocationResult));
    }
}
import {assert} from "chai";
import {TestSequenceStep} from "../testSequenceStep";

export class TestExpectation extends TestSequenceStep {
    _expectation;
    _expectedValue;
    
    constructor(endpointInvocator, view, expectation, expectedValue) {
        super(endpointInvocator, view);
        this._expectation = expectation;
        this._expectedValue = expectedValue;
    }
    
    handleResult(invocationResult) {
        assert[this._expectation](invocationResult, this._expectedValue);
        return true;
    }
}
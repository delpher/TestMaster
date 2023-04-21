import {assert, AssertionError} from "chai";
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
        try {
            assert[this._expectation](invocationResult, this._expectedValue);
        } catch (error) {
            if (error instanceof AssertionError) {
                this._view.displayErrorMessage(error);
                return false;
            }
            throw error;
        }
        return true;
    }
}
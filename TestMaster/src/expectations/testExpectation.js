import {assert, AssertionError} from "chai";
import {TestSequenceStep} from "../testSequenceStep";

export class TestExpectation extends TestSequenceStep {
    _expectation;
    _expectedValue;
    _assert;
    
    constructor(endpointInvocator, view, expectation, expectedValue) {
        super(endpointInvocator, view);
        this._assert = assert;
        this._expectation = expectation;
        this._expectedValue = expectedValue;
    }
    
    handleResult(invocationResult) {
        try {
            this._runExpectation(invocationResult);
            return true;
        } catch (error) {
            return this._handleError(error);
        }
    }

    _handleError(error) {
        if (error instanceof AssertionError) {
            this._view.displayErrorMessage(error);
            return false;
        }
        throw error;
    }

    _runExpectation(invocationResult) {
        let functionBody = `
                var $actual = arguments[0];
                var $expected = this._expectedValue;
                this._${this._expectation};`;

        let assertionFunc = new Function(functionBody);

        return assertionFunc.call(this, invocationResult);
    }
}
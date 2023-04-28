import {assert, AssertionError} from "chai";
import {TestSequenceStep} from "../testSequenceStep";

export class TestExpectation extends TestSequenceStep {
    _expectation;
    _expectedValue;
    _assert;
    _node;
    
    constructor(endpointInvocator, expectation, expectedValue, node) {
        super(endpointInvocator, node);
        this._node = node;
        this._assert = assert;
        this._expectation = expectation;
        this._expectedValue = expectedValue;
    }
    
    handleResult(invocationResult, reporter) {
        try {
            this._runExpectation(invocationResult);
            reporter.success(this._node);
        } catch (error) {
            return this._handleError(error, reporter);
        }
    }

    _handleError(error, reporter) {
        if (error instanceof AssertionError) {
            reporter.failure(this._node, error);
        } else {
            reporter.error(this._node, error);
        }
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
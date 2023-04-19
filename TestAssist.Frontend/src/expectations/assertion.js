import {assert} from "chai";

export class Assertion {
    _assertion;
    _expectedValue;
    
    constructor(assertion, expectedValue) {
        this._assertion = assertion;
        this._expectedValue = expectedValue;
    }
    
    execute(value) {
        assert[this._assertion](value, this._expectedValue);
    }
}
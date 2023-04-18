import {assert} from "chai";
export class Assertion {
    _assertionMethod;
    _expectedValue;
    
    constructor(node) {
        this._assertionMethod = node.getAttribute('tm-assert');
        this._expectedValue = node.innerText;
        console.log(this._assertionMethod);
    }
    
    execute(value) {
        assert[this._assertionMethod](value, this._expectedValue);
    }
}
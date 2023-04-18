import {TestSequenceStep} from "../testSequenceStep";
import {Assertion} from "./assertion";

export class TestExpectation extends TestSequenceStep {
    _assertions;
    
    constructor(node) {
        super(node);
        this._assertions = [];
        node.querySelectorAll('[tm-assert]').forEach(assertionNode => this._assertions.push(new Assertion(assertionNode)));
    }
    
    handleResult(invocationResult) {
        this._assertions.forEach(assertion => assertion.execute(invocationResult));
    }
}
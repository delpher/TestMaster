import {TestAssert} from "./testAssert";
import {TestSequence} from "./testSequence";

export class Test {
    _setup;
    _act;
    _assert;

    constructor(node) {
        this._setup = new TestSequence(node.querySelectorAll('div[tm-role="setup"]').item(0));
        this._act = new TestSequence(node.querySelectorAll('div[tm-role="act"]').item(0));
        this._assert = new TestAssert(node.querySelectorAll('div[tm-role="assert"]').item(0));
    }

    execute(context) {
        this._setup.execute(context);
        this._act.execute(context);
        this._assert.execute(context);
    }
}
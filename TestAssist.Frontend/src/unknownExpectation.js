import {TestListExpectation} from "./testListExpectation";

export class UnknownExpectation extends TestListExpectation {
    constructor(node) {
        super(node);
    }

    execute(context) {
        console.error('Expectation syntax can not be recognized.', this._node);
    }
}
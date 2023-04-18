import {TestListExpectation} from "./testListExpectation";

export class TestAssert {
    _expectations;

    constructor(node) {
        this._expectations = [];

        node.querySelectorAll('[tm-role="expect"]').forEach(
            n => this._expectations.push(this.createExpectation(n))
        )
    }

    createExpectation(node) {
        switch (node.nodeName.toLocaleLowerCase()) {
            case 'ul':
                return new TestListExpectation(node);
        }
    }

    execute(context) {
        this._expectations.forEach(expectation => expectation.execute(context));
    }
}
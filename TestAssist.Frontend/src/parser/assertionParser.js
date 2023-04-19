import {Assertion} from "../expectations/assertion";

export class AssertionParser {
    static parse(node) {
        const assertion = node.getAttribute('tm-assert');
        const expectedValue = node.innerText;
        return new Assertion(assertion, expectedValue);
    }
}
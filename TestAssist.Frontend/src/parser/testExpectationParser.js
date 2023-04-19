import {TestSequenceStepParser} from "./testSequenceStepParser";
import {TestExpectation} from "../expectations/testExpectation";
import {AssertionParser} from "./assertionParser";
import {TestEndpointInvocatorParser} from "./testEndpointInvocatorParser";

export class TestExpectationParser {
    static build(node) {
        const endpointInvocator = TestEndpointInvocatorParser.parse(node);
        const view = TestSequenceStepParser._createView(node);
        const assertions = this._parseAssertions(node);
        return new TestExpectation(endpointInvocator, assertions, view);
    }

    static _parseAssertions(node) {
        const assertions = [];

        node.querySelectorAll('[tm-assert]')
            .forEach(assertionNode =>
                assertions.push(this._parseAssertion(assertionNode)));

        return assertions;
    }

    static _parseAssertion(assertionNode) {
        return AssertionParser.parse(assertionNode);
    }
}
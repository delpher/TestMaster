import {TestSequenceStepParser} from "./testSequenceStepParser";
import {TestExpectation} from "../expectations/testExpectation";
import {AssertionParser} from "./assertionParser";

export class TestExpectationParser {
    static build(node) {
        const methodName = TestSequenceStepParser._parseMethodName(node);
        const methodArguments = TestSequenceStepParser._parseMethodArguments(node);
        const view = TestSequenceStepParser._createView(node);
        const assertions = this._parseAssertions(node);
        return new TestExpectation(methodName, methodArguments, assertions, view);
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
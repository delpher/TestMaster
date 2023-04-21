import {TestSequenceStepParser} from "./testSequenceStepParser";
import {TestEndpointInvocatorParser} from "./testEndpointInvocatorParser";
import {TestExpectation} from "../expectations/testExpectation";

export class TestExpectationParser {
    static build(node) {
        const endpointInvocator = TestEndpointInvocatorParser.parse(node);
        const view = TestSequenceStepParser._createView(node);
        const expectation = this._parseExpectation(node);
        const expectedValue = this._parseExpectedValue(node);
        return new TestExpectation(endpointInvocator, view, expectation, expectedValue);
    }

    static _parseExpectation(node) {
        return node.getAttribute("tm-assert");
    }

    static _parseExpectedValue(node) {
        const expectedValues = node.querySelectorAll('[tm-role="expected"]')
        
        if (expectedValues.length > 1)
            throw new Error("Only one expected value per assertion is allowed");
        
        if (expectedValues.length === 0)
            throw new Error("Expectation must have expected value specified");
        
        return JSON.parse(expectedValues.item(0).innerText);
    }
}
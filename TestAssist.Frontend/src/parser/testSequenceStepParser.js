import {TestSequenceStep} from "../testSequenceStep";
import {TestSequenceStepView} from "../testSequenceStepView";
import {TestEndpointInvocatorParser} from "./testEndpointInvocatorParser";

export class TestSequenceStepParser {
    static build(node) {
        const endpointInvocator = TestEndpointInvocatorParser.parse(node);
        const view = this._createView(node);
        return new TestSequenceStep(endpointInvocator, view);
    }

    static _createView(node) {
        return new TestSequenceStepView(node);
    }
}
import {TestSequenceStep} from "../testSequenceStep";
import {TestEndpointInvocatorParser} from "./testEndpointInvocatorParser";

export class TestSequenceStepParser {
    static parse(node) {
        const endpointInvocator = TestEndpointInvocatorParser.parse(node);
        return new TestSequenceStep(endpointInvocator, node);
    }
}
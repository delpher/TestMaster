import {TestSequence} from "../testSequence";

import {TestSequenceStepParser} from "./testSequenceStepParser";

export class TestSequenceParser {
    static build(node) {
        const steps = [];

        node
            .querySelectorAll('p[tm-call]')
            .forEach(n => steps.push(this._createStep(n)));

        return new TestSequence(steps);
    }

    static _createStep(node) {
        return TestSequenceStepParser.build(node);
    }
}
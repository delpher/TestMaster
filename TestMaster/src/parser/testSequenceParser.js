import {TestSequence} from "../testSequence";

import {TestSequenceStepParser} from "./testSequenceStepParser";

export class TestSequenceParser {
    static parse(node) {
        const steps = [];

        node
            .querySelectorAll('p[tm-call]')
            .forEach(n => steps.push(this._parseStep(n)));

        return new TestSequence(steps);
    }

    static _parseStep(node) {
        return TestSequenceStepParser.parse(node);
    }
}
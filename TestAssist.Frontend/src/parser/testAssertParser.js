﻿import {TestSequence} from "../testSequence";
import {UnknownExpectation} from "../expectations/unknownExpectation";

import {TestExpectationParser} from "./testExpectationParser";

export class TestAssertParser {
    static build(node) {
        const expectations = [];
        node.querySelectorAll('[tm-role="expect"]').forEach(
            n => expectations.push(this._createExpectation(n))
        );

        return new TestSequence(expectations);
    }

    static _createExpectation(node) {
        switch (node.nodeName.toLocaleLowerCase()) {
            case 'p':
                return TestExpectationParser.build(node);
            default:
                return new UnknownExpectation();
        }
    }
}
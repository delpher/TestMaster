import {Test} from "../test";
import {TestSequenceParser} from "./testSequenceParser";
import {TestAssertParser} from "./testAssertParser";

export class TestParser {
    static build(node) {
        const setup = this._parseSetup(node);
        const act = this._parseAct(node);
        const assert = this._parseAssert(node);
        return new Test(setup, act, assert);
    }

    static _parseAssert(node) {
        return TestAssertParser.build(node.querySelectorAll('div[tm-role="assert"]').item(0));
    }

    static _parseAct(node) {
        return TestSequenceParser.build(node.querySelectorAll('div[tm-role="act"]').item(0));
    }

    static _parseSetup(node) {
        return TestSequenceParser.build(node.querySelectorAll('div[tm-role="setup"]').item(0));
    }
}

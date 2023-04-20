import {TestParser} from "./parser/testParser";

export class TestRunner {

    _testNode;
    
    constructor(testNode) {
        this._testNode = testNode;
        this._test = this._parseTest();
    }

    _parseTest() {
        return TestParser.build(this._testNode);
    }

    async run(context) {
        await this._test.execute(context)
    }
}


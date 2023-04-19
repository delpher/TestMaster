import {TestParser} from "./parser/testParser";

export class TestRunner {

    _testNode;
    
    constructor(testNode) {
        this._testNode = testNode;
    }
    
    run(context) {
        const test = this._parseTest();
        test.execute(context)
    }

    _parseTest() {
        return TestParser.build(this._testNode);
    }
}


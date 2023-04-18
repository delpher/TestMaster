import {Test} from "./test";

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
        return new Test(this._testNode);
    }
}


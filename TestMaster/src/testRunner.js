import {TestParser} from "./parser/testParser";

export class TestRunner {

    _node;
    
    constructor(node) {
        this._node = node;
        this._test = this._parseTest();
    }

    _parseTest() {
        return TestParser.parse(this._node);
    }

    async run(context) {
        await this._test.execute(context)
    }
}


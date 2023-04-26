import {TestParser} from "./parser/testParser";
import {EndpointsParser} from './backend/endpointsParser';

export class TestRunner {
    _node;
    _test;
    _testEndpoints;
    
    constructor(node) {
        this._node = node;
        this._test = this._parseTest();
        this._testEndpoints = this._parseTestEndpoints(node);
    }

    async run(globalContext) {
        const context = globalContext.join(this._testEndpoints); 
        await this._test.execute(context)
    }

    _parseTest() {
        return TestParser.parse(this._node);
    }

    _parseTestEndpoints(node) {
        return  EndpointsParser.parse(node);
    }
}


import {TestParser} from "./parser/testParser";
import {EndpointsParser} from "./backend/endpointsParser";
import {ConsoleTestReporter} from "./consoleTestReporter";
import {VisualTestReporter} from "./visualTestReporter";

export class TestRunner {
    _node;
    _test;
    _testEndpoints;
    
    constructor(node, reporter) {
        this._node = node;
        this._test = this._parseTest(reporter);
        this._testEndpoints = this._parseTestEndpoints(node);
        this._reporter = new VisualTestReporter(new ConsoleTestReporter());
    }

    async run(globalContext) {
        this._reporter.reset();
        const context = globalContext.join(this._testEndpoints); 
        await this._test.execute(context, this._reporter)
    }

    _parseTest() {
        return TestParser.parse(this._node);
    }

    _parseTestEndpoints(node) {
        return  EndpointsParser.parse(node);
    }
}


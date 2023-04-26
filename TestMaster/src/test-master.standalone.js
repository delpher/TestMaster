import {TestRunner} from './testRunner';
import {ExternalEndpointsParser} from './backend/externalEndpointsParser';

(async () => {
    const tests = [];
    
    const globalContext = await ExternalEndpointsParser.parse();

    document
        .querySelectorAll('[tm-role="test"]')
        .forEach(testNode => tests.push(runTest(globalContext, testNode)));

    await Promise.all(tests);

    async function runTest(globalContext, testNode) {
        const runner = new TestRunner(testNode);
        await runner.run(globalContext);
    }
})();
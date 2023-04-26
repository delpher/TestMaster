import {TestRunner} from './testRunner';
import {EndpointsParser} from './backend/endpointsParser';
import {EndpointContext} from './backend/endpointContext';

(async () => {
    const testNode = document.querySelectorAll('[tm-role="test"]').item(0);

    function parseInlineEndpoints() {
        const inlineEndpoints = document.querySelectorAll('[tm-role="endpoints"]');
        let inlineContext = new EndpointContext([]);
        
        if (inlineEndpoints.length === 1)
            inlineContext = EndpointsParser.parse(inlineEndpoints.item(0));

        return inlineContext;
    }

    if (testNode) {

        let linkedEndpoints = await prefetchLinkedEndpoints();

        const runner = new TestRunner(testNode);
        const inlineEndpoints = parseInlineEndpoints();
        
        await runner.run(linkedEndpoints.join(inlineEndpoints));
    }

    async function prefetchLinkedEndpoints() {
        let emptyContext = new EndpointContext([]);

        const links = document.querySelectorAll('link[rel="endpoints"]');
        if (links.length === 0) return emptyContext;

        let endpointsUrl = links.item(0).href;
        const response = await fetch(endpointsUrl);
        if (!response.ok) throw new Error(`Failed to load endpoint from: ${endpointsUrl}`)

        const container = document.createElement('div');
        container.innerHTML = await response.text();

        return EndpointsParser.parse(container);
    }
})();
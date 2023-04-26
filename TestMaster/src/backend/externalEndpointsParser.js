import {EndpointContext} from './endpointContext';
import {EndpointsParser} from './endpointsParser';

export class ExternalEndpointsParser {
    static async parse() {
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
}
import {EndpointContext} from './endpointContext';
import {EndpointParser} from './endpointParser';

export class EndpointsParser {
    static parse(node) {
        const endpointsNode = node.querySelectorAll('[tm-role="endpoints"]').item(0);
        if (!endpointsNode) return new EndpointContext([]);
        
        const endpointNodes = endpointsNode.querySelectorAll('tm-endpoint');
        const endpoints = [];
        const backendUrl = endpointsNode.getAttribute('tm-backend');
        for (let endpointNode of endpointNodes)
            endpoints.push(EndpointParser.parse(backendUrl, endpointNode));
        return new EndpointContext(endpoints);
    }
}
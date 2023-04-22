import {EndpointContext} from './endpointContext';
import {EndpointParser} from './endpointParser';

export class EndpointsParser {
    static parse(node) {
        const endpointNodes = node.querySelectorAll('tm-endpoint');
        const endpoints = [];
        const backendUrl = node.getAttribute('tm-backend');
        for (let endpointNode of endpointNodes)
            endpoints.push(EndpointParser.parse(backendUrl, endpointNode));
        return new EndpointContext(endpoints);
    }
}
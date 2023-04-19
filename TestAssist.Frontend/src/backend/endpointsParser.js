import {EndpointContext} from "./endpointContext";
import {Endpoint} from "./endpoint";

class EndpointParser {
    static parse(backendUrl, node) {
        const name = node.getAttribute('name');
        const method = node.getAttribute('method');
        const dataTemplate = node.innerText;
        return new Endpoint(backendUrl, name, method, dataTemplate);
    }
}

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
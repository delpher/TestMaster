import {ParameterlessEndpoint} from './parameterlessEndpoint';
import {ParametrizedEndpoint} from './parametrizedEndpoint';

export class EndpointParser {
    static parse(backendUrl, node) {
        const name = node.getAttribute('name');
        const method = node.getAttribute('method');
        switch (method) {
            case 'GET':
                return new ParameterlessEndpoint(backendUrl, name);
            case 'POST':
                return new ParametrizedEndpoint(backendUrl, name, node.innerText);
            default:
                throw new Error(`Method ${method} for endpoint is not supported.`);
        }
    }
}
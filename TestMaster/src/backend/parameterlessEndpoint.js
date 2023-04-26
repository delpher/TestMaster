import {Endpoint} from './endpoint';

export class ParameterlessEndpoint extends Endpoint {
    async invokeBackendEndpoint(parameters, requestUrl) {
        return fetch(requestUrl);
    }
}
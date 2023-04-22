import {Endpoint} from './endpoint';

export class ParameterlessEndpoint extends Endpoint {
    async invokeBackendEndpoint(parameters, requestUrl) {
        return await fetch(requestUrl);
    }
}
import {BackendEndpointError} from './backendEndpointError';

export class Endpoint {
    _backendUrl;
    _name;
    
    constructor(backendUrl, name) {
        this._backendUrl = backendUrl;
        this._name = name;
    }
    
    async invoke(parameters, retries) {
        retries = retries && retries || 0;
        const response = await this._getResponse(parameters);
        const json = await response.json();
        if (response.ok)
            return json;
        else if (retries < 3) {
            await this._delay(100);
            return await this.invoke(parameters, retries + 1)
        }
        else 
            throw new BackendEndpointError(json);
    }

    async _getResponse(parameters) {
        const requestUrl = `${this._backendUrl}/${this._name}`;
        return await this.invokeBackendEndpoint(parameters, requestUrl);
    }

    async invokeBackendEndpoint(parameters, requestUrl) {
        throw new Error('Abstract method invocation');
    }

    async _delay(timeout) {
        return new Promise((resolve) => {
            setTimeout(resolve, timeout);
        });
    }
}
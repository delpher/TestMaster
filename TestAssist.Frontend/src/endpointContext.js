class ContextInitializationError extends Error {
    constructor(response) {
        super(`Failed to initialize connection to backend service. ${response.status} ${response.statusText}`);
        this.response = response;
    }
}

export class EndpointContext {
    _backendUrl;
    _endpoints;
    
    constructor(backendUrl) {
        this._backendUrl = backendUrl;
    }
    
    init() {
        return fetch(this._backendUrl)
            .then(response => this._parseResponse(response))
            .then(endpoints => this._initializeEndpoints(endpoints))
            .then(() => this)
    }

    _parseResponse(response) {
        if (response.ok)
            return response.json();
        throw new ContextInitializationError(response);
    }

    invoke(name, parameters) {
        if (this._endpoints.hasOwnProperty(name))
            return this._endpoints[name](parameters);
        throw new Error(`Endpoint ${name} not found.`);
    }

    _initializeEndpoints(endpoints) {
        this._endpoints = {};
        for (const name of endpoints) {
            this._endpoints[name] = () => {
                //throw new Error(`Endpoint: ${name}. Invocator is not implemented`);
                return true;
            }
        }
    }

    static create(backendUrl) {
        return new EndpointContext(backendUrl).init();
    }
}
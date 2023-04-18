export class EndpointContext {
    _backendUrl;
    _endpoints;
    
    constructor(backendUrl) {
        this._backendUrl = backendUrl;
    }
    
    init() {
        return fetch(this._backendUrl)
            .then(response => response.json())
            .then(endpoints => this._initializeEndpoints(endpoints))
            .then(() => this);
    }
    
    invoke(name, parameters) {
        this._endpoints[name](parameters);
    }

    _initializeEndpoints(endpoints) {
        this._endpoints = {};
        for (const name of endpoints) {
            this._endpoints[name] = () => {
                return false;
            }
        }
    }
}
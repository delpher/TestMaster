export class EndpointContext {
    _endpoints;
    
    constructor(endpoints) {
        this._endpoints = endpoints;
    }
   
    invoke(name, parameters) {
        const endpoint = this._endpoints.filter(endpoint => endpoint._name === name)[0];
        if (endpoint) return endpoint.invoke(parameters);
        throw new Error(`Endpoint ${name} not found.`);
    }
    
    join(otherContext) {
        return new EndpointContext(this._endpoints.concat(otherContext._endpoints));
    }
}
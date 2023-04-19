export class TestEndpointInvocator {
    constructor(endpointName, endpointArguments) {
        this._endpointName = endpointName;
        this._endpointArguments = endpointArguments;
    }
    
    invoke(context) {
        return context.invoke(this._endpointName, this._endpointArguments);
    }
}
import {Endpoint} from './endpoint';
import Mustache from 'mustache';

export class ParametrizedEndpoint extends Endpoint {
    _dataTemplate;
    
    constructor(backendUrl, name, dataTemplate) {
        super(backendUrl, name);
        this._dataTemplate = dataTemplate;
    }
    async invokeBackendEndpoint(parameters, requestUrl) {
        const data = {};
        for (let parameter of parameters)
            data[parameter.name] = JSON.parse(parameter.value);

        const requestContent = Mustache.render(this._dataTemplate, data);

        return await fetch(requestUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestContent
        });
    }
}
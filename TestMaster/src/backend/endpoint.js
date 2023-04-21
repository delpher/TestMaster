import Mustache from 'mustache';

export class BackendEndpointError extends Error {
    constructor(errorResult) {
        super(`${errorResult['Message']} ${errorResult['Exception']}`);
    }
}

export class Endpoint {
    _backendUrl;
    _name;
    _method;
    _dataTemplate;
    
    constructor(backendUrl, name, method, dataTemplate) {
        this._backendUrl = backendUrl;
        this._name = name;
        this._method = method;
        this._dataTemplate = dataTemplate;
    }
    
    async invoke(parameters) {
        const response = await this._getResponse(parameters);
        const json = await response.json();
        if (response.ok)
            return json;
        else
            throw new BackendEndpointError(json);
    }

    async _getResponse(parameters) {
        const requestUrl = `${this._backendUrl}/${this._name}`;

        switch (this._method) {
            case 'GET':
                return await fetch(requestUrl);
            case 'POST':
                const data = {};
                for (let parameter of parameters)
                    data[parameter.name] = JSON.parse(parameter.value);

                const requestContent = Mustache.render(this._dataTemplate, data);

                return await fetch(requestUrl, {
                    method: this._method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: requestContent
                });
        }
    }
}
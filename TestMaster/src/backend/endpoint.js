import Mustache from "mustache";

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
        const requestUrl = `${this._backendUrl}/${this._name}`;
        
        if (this._method === "GET") {
            const response = await fetch(requestUrl);
            return await response.json();
        } else if (this._method === "POST") {
            const data = {};
            for (let parameter of parameters)
                data[parameter.name] = parameter.value;
            
            const requestContent = Mustache.render(this._dataTemplate, data);
            
            const response = await fetch(requestUrl, {
                method: this._method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: requestContent
            });
            
            return await response.json();
        }
        
    }
}
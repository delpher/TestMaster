import {TestEndpointInvocator} from "../testEndpointInvocator";

export class TestEndpointInvocatorParser {
    static parse(node) {
        const endpointName = this._parseEndpointName(node);
        const endpointArguments = this._parseEndpointArguments(node);
        
        return new TestEndpointInvocator(endpointName, endpointArguments);
    }
    
    static _parseEndpointName(node) {
        return node.getAttribute('tm-call');
    }

    static _parseEndpointArguments(node) {
        const methodArguments = [];

        node.querySelectorAll('span[tm-arg]')
            .forEach(argNode =>
                methodArguments.push(this._createArgument(argNode)));

        return methodArguments;
    }

    static _createArgument(argNode) {
        return {
            name: argNode.getAttribute('tm-arg'),
            value: argNode.innerText
        };
    }


}
import {TestSequenceStep} from "../testSequenceStep";
import {TestSequenceStepView} from "../testSequenceStepView";

export class TestSequenceStepParser {
    static build(node) {
        const methodName = this._parseMethodName(node);
        const methodArguments = this._parseMethodArguments(node);
        const view = this._createView(node);
        return new TestSequenceStep(methodName, methodArguments, view);
    }

    static _createView(node) {
        return new TestSequenceStepView(node);
    }

    static _parseMethodName(node) {
        return node.getAttribute('tm-call');
    }

    static _parseMethodArguments(node) {
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
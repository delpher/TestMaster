import {TestSequenceStepClassView} from "./testSequenceStepClassView";

export class TestSequenceStepMessageView extends TestSequenceStepClassView {
    _errorDisplay;
    
    constructor(node, className, message) {
        super(node, className);
        this._renderMessage(message);
    }

    _renderMessage(message) {
        this._errorDisplay = document.createElement('span');
        this._errorDisplay.classList.add(this._className);
        this._errorDisplay.innerHTML = message.toString();
        this._node.append(document.createElement('br'));
        this._node.append(this._errorDisplay);
    }
    
    remove() {
        super.remove();
        this._errorDisplay.remove();
    }
}
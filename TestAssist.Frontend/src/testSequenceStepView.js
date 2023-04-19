export class TestSequenceStepView {
    _node;
    
    constructor(node) {
        this._node = node;
    }
    
    showSuccess() {
        this._node.classList.add('success');
    }
    
    showFailure() {
        this._node.classList.add('failure');
    }
    
    showError(error) {
        this._node.classList.add('error');
        const errorDisplay = document.createElement('div');
        errorDisplay.innerHTML = `<span class="error">${error.toString()}</span>`;
        errorDisplay.classList.add('error');
        this._node.before(errorDisplay);
        console.error(error);
    }
}
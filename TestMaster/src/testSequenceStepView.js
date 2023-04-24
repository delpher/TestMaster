export class TestSequenceStepView {
    _node;
    _errorDisplay;

    constructor(node) {
        this._node = node;
        this._initializeErrorDisplay();
    }

    _initializeErrorDisplay() {
        this._errorDisplay = document.createElement('span');
        this._errorDisplay.classList.add('error');
        this._errorDisplay.style.display = 'none';
        this._node.append(document.createElement('br'));
        this._node.append(this._errorDisplay);
    }

    showRunning() {
        this._node.className = '';
        this._node.classList.add('running');
        this._clearErrorMessage();
    }

    showSuccess() {
        this._node.className = '';
        this._node.classList.add('success');
        this._clearErrorMessage();
    }

    showFailure(message) {
        this._node.className = '';
        this._node.classList.add('failure');
        
        if (message) this._showErrorMessage(message)
        else this._clearErrorMessage();
    }

    showError(error) {
        this._node.className = '';
        this._node.classList.add('error');
        this._showErrorMessage(error);
    }

    _showErrorMessage(error) {
        this._errorDisplay.innerHTML = error.toString();
        this._errorDisplay.style.display = 'inline';
        console.error(error);
    }

    _clearErrorMessage() {
        this._errorDisplay.style.display = 'none';
    }
}
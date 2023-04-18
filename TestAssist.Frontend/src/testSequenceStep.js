export class TestSequenceStep {

    _node;
    _methodName;
    _methodArguments;

    constructor(node) {

        this._node = node;

        this._methodName = node.getAttribute('tm-call');
        this._methodArguments = [];
        node.querySelectorAll('span[tm-arg]').forEach(n => this._methodArguments.push(
            {
                name: n.getAttribute('tm-arg'),
                value: n.innerText
            }));
    }

    execute(context) {
        try {
            const invocationResult = context.invoke(this._methodName, this._methodArguments);
            const result = this.handleResult(invocationResult);
            if (result) this.showSuccess();
            else this.showFailure();
        } catch (e) {
            this.showError(e);
        }
    }

    showSuccess() {
        this._node.classList.add('success');
    }

    showFailure() {
        this._node.classList.add('failure');
    }

    showError(e) {
        this._node.classList.add('error');
        const errorDisplay = document.createElement('div');
        errorDisplay.innerHTML = `<span class="error">${e.toString()}</span>`;
        errorDisplay.classList.add('error');
        this._node.before(errorDisplay);
    }

    handleResult(invocationResult) {
        return invocationResult;
    }
}
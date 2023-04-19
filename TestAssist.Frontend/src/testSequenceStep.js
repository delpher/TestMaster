export class TestSequenceStep {

    _view;
    _methodName;
    _methodArguments;

    constructor(methodName, methodArguments, view) {
        this._methodName = methodName;
        this._methodArguments = methodArguments;
        this._view = view;
    }

    execute(context) {
        try {
            const invocationResult = context.invoke(this._methodName, this._methodArguments);
            const result = this.handleResult(invocationResult);
            if (result === true) this._view.showSuccess();
            else this._view.showFailure();
        } catch (e) {
            this._view.showError(e);
        }
    }
    handleResult(invocationResult) {
        return invocationResult;
    }
}
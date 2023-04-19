export class TestSequenceStep {

    _view;
    _endpointInvocator;

    constructor(endpointInvocator, view) {
        this._endpointInvocator = endpointInvocator;
        this._view = view;
    }

    execute(context) {
        try {
            const invocationResult = this._endpointInvocator.invoke(context);
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
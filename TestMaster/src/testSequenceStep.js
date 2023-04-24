export class TestSequenceStep {

    _view;
    _endpointInvocator;

    constructor(endpointInvocator, view) {
        this._endpointInvocator = endpointInvocator;
        this._view = view;
    }

    async execute(context) {
        this._view.showRunning();
        try {
            const invocationResult = await this._endpointInvocator.invoke(context);
            this.handleResult(invocationResult);
        } catch (e) {
            this._view.showError(e);
        }
    }
    
    handleResult(result) {
        if (result === true) this._view.showSuccess();
        else this._view.showFailure();
    }
}
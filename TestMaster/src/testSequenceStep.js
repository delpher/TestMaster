export class TestSequenceStep {
    _node;
    _endpointInvocator;

    constructor(endpointInvocator, node) {
        this._node = node;
        this._endpointInvocator = endpointInvocator;
    }

    async execute(context, reporter) {
        reporter.running(this._node);
        try {
            const invocationResult = await this._endpointInvocator.invoke(context);
            this.handleResult(invocationResult, reporter);
        } catch (e) {
            reporter.error(this._node, e);
        }
    }
    
    handleResult(result, reporter) {
        if (result === true) reporter.success(this._node);
        else reporter.failure(this._node);
    }
}
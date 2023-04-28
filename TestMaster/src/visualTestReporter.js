import {TestReporter} from "./testReporter";
import {TestSequenceStepClassView} from "./testSequenceStepClassView";
import {TestSequenceStepMessageView} from "./testSequenceStepMessageView";

export class VisualTestReporter extends TestReporter {
    _next;
    _views;

    constructor(next) {
        super();
        this._next = next;
        this._views = [];
    }

    running(node) {
        this._views.push(new TestSequenceStepClassView(node, "running"));
        this._next && this._next.running(node);
    }

    success(node) {
        this._views.push(new TestSequenceStepClassView(node, "success"));
        this._next && this._next.success(node);
    }

    failure(node, error) {
        this._views.push(new TestSequenceStepMessageView(node, "failure", error));
        this._next && this._next.failure(error, node);
    }

    error(node, error) {
        this._views.push(new TestSequenceStepMessageView(node, "error", error));
        this._next && this._next.failure(error, node);
    }

    reset() {
        for (const view of this._views) view.remove();
        this._next && this._next.reset();
    }
}
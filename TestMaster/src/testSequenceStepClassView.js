export class TestSequenceStepClassView {
    _node;
    _className;

    constructor(node, className) {
        this._className = className;
        this._node = node;
        this._node.classList.add(className);
    }

    remove() {
        this._node.classList.remove(this._className);
    }

    static render(node) {
        return new TestSequenceStepClassView(node);
    }
}
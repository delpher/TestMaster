export class Test {
    _setup;
    _act;
    _assert;

    constructor(setup, act, assert) {
        this._setup = setup;
        this._act = act;
        this._assert = assert;
    }

    execute(context) {
        this._setup.execute(context);
        this._act.execute(context);
        this._assert.execute(context);
    }
}
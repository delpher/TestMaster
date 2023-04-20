export class Test {
    _setup;
    _act;
    _assert;

    constructor(setup, act, assert) {
        this._setup = setup;
        this._act = act;
        this._assert = assert;
    }

    async execute(context) {
        await this._setup.execute(context);
        await this._act.execute(context);
        await this._assert.execute(context);
    }
}
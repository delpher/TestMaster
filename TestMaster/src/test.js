export class Test {
    _setup;
    _act;
    _assert;

    constructor(setup, act, assert) {
        this._setup = setup;
        this._act = act;
        this._assert = assert;
    }

    async execute(context, reporter) {
        await this._setup.execute(context, reporter);
        await this._act.execute(context, reporter);
        await this._assert.execute(context, reporter);
    }
}
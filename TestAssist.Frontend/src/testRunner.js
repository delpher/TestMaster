import {Test} from "./test";

export class TestRunner {

    static run(context) {
        const test = this._parseTest();
        test.execute(context)
    }

    static _parseTest() {
        const testNode = document.querySelectorAll('div[tm-role="test"]').item(0);
        return new Test(testNode);
    }
}


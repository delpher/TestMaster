import {TestReporter} from "./testReporter";

export class ConsoleTestReporter extends TestReporter {
    running(node) {
        console.log("STEP RUNNING", node);
    }

    success(node) {
        console.log("STEP SUCCESS", node);
    }

    failure(node, error) {
        console.log("STEP FAILURE", node);
        error && console.warn(error);
    }

    error(node, error) {
        console.log("STEP ERROR", node);
        console.error(error);
    }

    reset() {
        console.clear();
    }
}
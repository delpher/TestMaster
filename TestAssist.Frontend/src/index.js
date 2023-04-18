import "./styles.css";
import {TestRunner} from "./testRunner";
import {TestContext} from "./testContext";

class SampleContext extends TestContext {
    'Application/CreateUser'() {
        return true;
    }

    'Application/LoginUser'() {
        return false;
    }

    'Storages/CreateStorage'() {
        return true;
    }

    'StorageExplorer/GetDisplayedStorages'() {
        return false;
    }
}

const runner = new TestRunner();
runner.run(new SampleContext());
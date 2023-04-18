export class TestContext {
    invoke(methodName, methodArguments) {
        if (!this[methodName]) throw new Error('Context doesnt have method ' + methodName);
        return this[methodName](methodArguments);
    }
}
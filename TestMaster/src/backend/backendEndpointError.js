export class BackendEndpointError extends Error {
    constructor(errorResult) {
        super(`${errorResult.message} ${errorResult.exception}`);
    }
}
export class BackendEndpointError extends Error {
    constructor(errorResult) {
        super(`${errorResult['Message']} ${errorResult['Exception']}`);
    }
}
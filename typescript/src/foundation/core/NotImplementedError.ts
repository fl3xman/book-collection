export class NotImplementedError extends Error {
    constructor(message: string = "Not implemented.") {
        super(message);
        Object.setPrototypeOf(this, NotImplementedError.prototype);
    }
}

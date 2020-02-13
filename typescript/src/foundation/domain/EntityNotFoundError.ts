import * as _ from "lodash";

export class EntityNotFoundError extends Error {
    constructor(message: string = "Entity not found.") {
        super(message);
        Object.setPrototypeOf(this, EntityNotFoundError.prototype);
    }
}

export function guardEntityNotFound<T>(value: T | null | undefined | false, message?: string): T {
    if (_.isNil(value) || value === false) {
        throw new EntityNotFoundError(message || "Entity not found.")
    }
    return value;
}